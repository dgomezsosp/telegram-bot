const AuthorizationService = require('../services/authorization-service')
const EmailService = require('../services/email-service')
const sequelizeDb = require('../models/sequelize')
const BotVerification = sequelizeDb.BotVerification

exports.handleEvent = async (redisClient, subscriberClient) => {
  await subscriberClient.subscribe('new-customer', async (message) => {
    try {
      const data = JSON.parse(message)

      // Generar código de verificación de 6 dígitos
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

      // Guardar en la tabla bot_verifications
      await BotVerification.create({
        email: data.email,
        verificationCode,
        telegramUserId: null
      })

      const authorizationService = new AuthorizationService()
      const activationUrl = await authorizationService.createActivationToken(data.id, 'customer')

      const emailService = new EmailService('gmail')
      await emailService.sendEmail(
        data,
        'customer',
        'activationCustomer',
        {
          name: data.name,
          activationUrl,
          verificationCode  // Añadir el código al template
        }
      )
    } catch (error) {
      console.error('Error procesando mensaje:', error)
    }
  })
}
