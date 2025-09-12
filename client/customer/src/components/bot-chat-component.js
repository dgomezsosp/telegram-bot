class BotChat extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
    this.isOpen = false
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
    this.setupEventListeners()
  }

  async loadData () {
    // Aquí puedes cargar datos iniciales si es necesario
    this.data = [
      { id: 1, message: '¡Hola! ¿En qué puedo ayudarte?', sender: 'bot', time: new Date() }
    ]
  }

  render () {
    this.shadow.innerHTML =
    /* html */
    `
      <style>
        :host {
          --chat-gradient: linear-gradient(135deg, #1D3557 0%, #457B9D 100%);
          --chat-primary: #1D3557;
          --chat-secondary: #457B9D;
        }
  
        * {
          box-sizing: border-box;
        }
  
        h1, h2, h3, h4, h5, h6, p {
          margin: 0;
        }
  
        h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button {
          font-family: "Nunito Sans", serif;
          font-optical-sizing: auto;
        }
  
        .chat-collapsed {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: var(--chat-gradient);
          color: white;
          padding: 15px 20px;
          border-radius: 25px;
          box-shadow: 0 5px 35px rgba(147, 147, 147, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          transition: transform 0.2s, box-shadow 0.2s;
          font-weight: 500;
        }
  
        .chat-collapsed:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 40px rgba(147, 147, 147, 0.3);
        }
  
        .chat-collapsed .chat-icon {
          width: 20px;
          height: 20px;
        }
  
        .chat-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: #f8f8f8;
          border-radius: 10px;
          box-shadow: 0 5px 35px rgba(147, 147, 147, 0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
        }
  
        .chat-title {
          background: var(--chat-gradient);
          color: white;
          padding: 15px 20px;
          text-align: center;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
  
        .close-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
  
        .close-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
  
        .close-button svg {
          width: 16px;
          height: 16px;
        }
  
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          list-style: none;
          margin: 0;
          background: white;
        }
  
        .message {
          margin-bottom: 15px;
          display: flex;
          align-items: flex-end;
        }
  
        .message.left {
          justify-content: flex-start;
        }
  
        .message.right {
          justify-content: flex-end;
        }
  
        .message .msg {
          background: #ececec;
          border-radius: 15px;
          padding: 10px 15px;
          max-width: 250px;
          word-wrap: break-word;
        }
  
        .message.right .msg {
          background: var(--chat-gradient);
          color: white;
        }
  
        .message .msg p {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 5px;
        }
  
        .message .msg time {
          font-size: 11px;
          color: #999;
          display: block;
        }
  
        .message.right .msg time {
          color: rgba(255, 255, 255, 0.7);
        }
  
        .message-box {
          background: #f8f8f8;
          padding: 15px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
  
        .message-input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
          background: white;
        }
  
        .message-input:focus {
          border-color: var(--chat-primary);
        }
  
        .send-button {
          background: var(--chat-gradient);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
  
        .send-button:hover {
          transform: scale(1.05);
        }
  
        .send-button:active {
          transform: scale(0.95);
        }
  
        .send-button svg {
          width: 20px;
          height: 20px;
        }
  
        /* Scrollbar personalizado */
        .messages::-webkit-scrollbar {
          width: 6px;
        }
  
        .messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
  
        .messages::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
  
        .messages::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
  
        @media (max-width: 480px) {
          .chat-container {
            right: 10px;
            bottom: 10px;
            width: calc(100vw - 20px);
            max-width: 350px;
          }
  
          .chat-collapsed {
            right: 10px;
            bottom: 10px;
          }
        }
      </style>
  
      <div class="chat-collapsed">
        <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z" />
        </svg>
        <span>¿Tienes alguna pregunta?</span>
      </div>
  
      <div class="chat-container">
        <div class="chat-title">
          <span>Chat de Soporte</span>
          <button class="close-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
        <ul class="messages"></ul>
        <div class="message-box">
          <input type="text" class="message-input" placeholder="Escribe tu mensaje...">
          <button class="send-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `

    // Renderizar mensajes iniciales
    this.data.forEach(msg => {
      this.addMessage(msg.message, msg.sender)
    })
  }

  setupEventListeners () {
    const messageInput = this.shadow.querySelector('.message-input')
    const sendButton = this.shadow.querySelector('.send-button')
    const chatCollapsed = this.shadow.querySelector('.chat-collapsed')
    const closeButton = this.shadow.querySelector('.close-button')

    // Toggle chat
    const toggleChat = () => {
      this.isOpen = !this.isOpen
      const chatContainer = this.shadow.querySelector('.chat-container')
      const chatCollapsedElement = this.shadow.querySelector('.chat-collapsed')

      if (this.isOpen) {
        chatContainer.style.display = 'flex'
        chatCollapsedElement.style.display = 'none'
      } else {
        chatContainer.style.display = 'none'
        chatCollapsedElement.style.display = 'flex'
      }
    }

    const sendMessage = async () => {
      const message = messageInput.value.trim()
      if (message) {
        this.addMessage(message, 'user')
        messageInput.value = ''

        // Esperar 1 segundo antes de mostrar "Escribiendo..."
        setTimeout(async () => {
          this.showTypingIndicator()

          try {
            await this.postAnswer(message)
          } finally {
            this.hideTypingIndicator()
          }
        }, 1000)
      }
    }

    chatCollapsed.addEventListener('click', toggleChat)
    closeButton.addEventListener('click', toggleChat)
    sendButton.addEventListener('click', sendMessage)
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    })
  }

  addMessage (text, sender) {
    const messagesContainer = this.shadow.querySelector('.messages')
    const messageElement = document.createElement('li')
    messageElement.classList.add('message', sender === 'bot' ? 'left' : 'right')
    messageElement.innerHTML = `
      <div class="msg">
        <p>${text}</p>
        <time>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
      </div>
    `
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  async postAnswer (userMessage) {
    const chatDataJson = {
      prompt: userMessage,
      threadId: this.threadId
    }
    try {
      const response = await fetch('/api/customer/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatDataJson)
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json()

      this.threadId = data.threadId
      this.addMessage(data.answer.text, 'bot')
      console.log(chatDataJson.threadId)

      this.closeValidationErrors?.()
      this.resetForm?.()
    } catch (error) {
      if (error.status === 422) {
        const data = await error.json()
        this.validationErrors?.(data.message)

        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'Hay errores de validación en los datos',
            type: 'error'
          }
        }))
      }

      if (error.status === 500) {
        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'No se han podido guardar los datos',
            type: 'error'
          }
        }))
      }
    }
  }

  showTypingIndicator () {
    const messagesContainer = this.shadow.querySelector('.messages')
    const typingElement = document.createElement('li')
    typingElement.classList.add('message', 'left', 'typing-indicator')
    typingElement.innerHTML = `
      <div class="msg typing">
        <p>Escribiendo...</p>
      </div>
    `
    messagesContainer.appendChild(typingElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  hideTypingIndicator () {
    const typingIndicator = this.shadow.querySelector('.typing-indicator')
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }
}

customElements.define('bot-chat-component', BotChat)
