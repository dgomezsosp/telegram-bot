const TelegramBot = require('node-telegram-bot-api')
const { broadcast } = require('./websocket-service')
const sequelizeDb = require('../models/sequelize')
const BotVerification = sequelizeDb.BotVerification

class TelegramService {
  constructor(telegramToken, groupId) {
    this.token = telegramToken
    this.groupId = parseFloat(groupId)
    this.bot = new TelegramBot(this.token, { polling: true })
    this.sessionAnchors = new Map()

    // Manejar mensajes de grupo (código existente)
    this.bot.on('message', (msg) => {
      if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
        this.handleGroupMessage(msg)
      } else if (msg.chat.type === 'private') {
        this.handlePrivateMessage(msg)
      }
    })
  }

  async escalateToHuman(threadId, preview) {
    const text =
      `🆘 Nuevo caso [${threadId}]\n` +
      `Último mensaje: ${preview || '—'}\n` +
      'Responde a este mensaje con *reply* para contestar al usuario.'

    const sent = await this.bot.sendMessage(this.groupId, text, { parse_mode: 'Markdown' })
    this.sessionAnchors.set(sent.message_id, threadId)
  }

  async handleGroupMessage(msg) {
    try {
      if (msg.chat.id !== this.groupId) return
      if (!msg.reply_to_message) return

      const anchorId = msg.reply_to_message.message_id
      const threadId = this.sessionAnchors.get(anchorId)

      if (!threadId) return

      const message = msg.text || '(adjunto)'

      broadcast(threadId, {
        threadId,
        message
      })
    } catch (e) {
      console.log(e)
    }
  }

  async handlePrivateMessage(msg) {
    try {
      const telegramUserId = msg.from.id.toString()
      const messageText = msg.text || ''

      // Verificar si el mensaje es el comando /login
      if (messageText.startsWith('/login ')) {
        await this.handleLoginCommand(msg, telegramUserId)
        return
      }

      // Verificar si el usuario está verificado
      const verification = await BotVerification.findOne({
        where: {
          telegramUserId,
          deletedAt: null
        }
      })

      if (!verification) {
        // Usuario no verificado - enviar mensaje de instrucciones
        await this.bot.sendMessage(msg.chat.id,
          '🔒 *Para usar este bot necesitas verificar tu cuenta.*\n\n' +
          '📧 Revisa el correo que recibiste al registrarte y encontrarás tu código de verificación.\n\n' +
          '✏️ Escribe el siguiente comando:\n' +
          '`/login tu-email@ejemplo.com:123456`\n\n' +
          '⚠️ Reemplaza el email y el código con tus datos reales.',
          { parse_mode: 'Markdown' }
        )
        return
      }

      // Usuario verificado - aquí puedes procesar su mensaje normal
      // Por ejemplo, responder con tu lógica de chatbot o IA
      await this.bot.sendMessage(msg.chat.id,
        '✅ Usuario verificado. Procesando tu mensaje...\n\n' +
        `Recibí: "${messageText}"`
      )

      // Aquí puedes añadir la lógica del bot (OpenAI, ChromaDB, etc.)

    } catch (e) {
      console.error('Error en handlePrivateMessage:', e)
      await this.bot.sendMessage(msg.chat.id,
        '❌ Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'
      )
    }
  }

  async handleLoginCommand(msg, telegramUserId) {
    try {
      const messageText = msg.text
      // Formato esperado: /login email:codigo
      const commandParts = messageText.replace('/login ', '').trim()

      if (!commandParts.includes(':')) {
        await this.bot.sendMessage(msg.chat.id,
          '❌ *Formato incorrecto*\n\n' +
          '✏️ Usa el formato:\n' +
          '`/login tu-email@ejemplo.com:123456`',
          { parse_mode: 'Markdown' }
        )
        return
      }

      const [email, code] = commandParts.split(':')

      if (!email || !code) {
        await this.bot.sendMessage(msg.chat.id,
          '❌ *Faltan datos*\n\n' +
          '✏️ Asegúrate de incluir tanto el email como el código:\n' +
          '`/login tu-email@ejemplo.com:123456`',
          { parse_mode: 'Markdown' }
        )
        return
      }

      // Buscar en la base de datos
      const verification = await BotVerification.findOne({
        where: {
          email: email.trim(),
          verificationCode: code.trim(),
          deletedAt: null
        }
      })

      if (!verification) {
        await this.bot.sendMessage(msg.chat.id,
          '❌ *Verificación fallida*\n\n' +
          '⚠️ El email o código son incorrectos.\n' +
          '📧 Revisa tu correo de registro e intenta de nuevo.',
          { parse_mode: 'Markdown' }
        )
        return
      }

      // Verificación exitosa - guardar telegramUserId
      verification.telegramUserId = telegramUserId
      await verification.save()

      await this.bot.sendMessage(msg.chat.id,
        '✅ *¡Verificación exitosa!*\n\n' +
        '🎉 Tu cuenta está ahora vinculada.\n' +
        '💬 Ya puedes usar el bot libremente.\n\n' +
        '¿En qué puedo ayudarte?',
        { parse_mode: 'Markdown' }
      )

    } catch (e) {
      console.error('Error en handleLoginCommand:', e)
      await this.bot.sendMessage(msg.chat.id,
        '❌ Ocurrió un error durante la verificación. Por favor, inténtalo de nuevo.'
      )
    }
  }

  async relayUserMessage(threadId, text) {
    const anchorId = [...this.sessionAnchors.entries()]
      .find(([anchor, tId]) => tId === threadId)?.[0]

    if (!anchorId) return

    await this.bot.sendMessage(this.groupId, `👤 Usuario: ${text}`, {
      reply_to_message_id: anchorId
    })
  }
}

module.exports = TelegramService
