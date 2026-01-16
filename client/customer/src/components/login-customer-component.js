// CLIENT: client/customer/src/components/login-customer-component.js
class LoginCustomerComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.checkSignin()
    this.render()
  }

  render() {
    this.shadow.innerHTML =
    /* html */`
    <style>

      *{
        box-sizing: border-box;
      }

      img{
        object-fit: cover;
        width: 100%;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, label, input, button{
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
      }

      .login-container{
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        width: 100%;
      }

      .login-box{
        background-color: hsl(0, 0%, 100%);
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        padding: 3rem 2rem;
        width: 100%;
      }

      .login-title{
        color: hsl(200, 77%, 52%);
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        text-align: center;
      }

      .login-subtitle{
        color: hsl(0, 0%, 40%);
        font-size: 1rem;
        margin: 0 0 2rem 0;
        text-align: center;
      }

      .form-group{
        margin-bottom: 1.5rem;
      }

      .form-label{
        color: hsl(0, 0%, 30%);
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .form-input{
        background-color: hsl(240, 33%, 99%);
        border: 2px solid hsl(0, 0%, 90%);
        border-radius: 0.5rem;
        color: hsl(0, 0%, 20%);
        font-size: 1rem;
        padding: 0.75rem 1rem;
        transition: border-color 0.3s ease;
        width: 100%;
      }

      .form-input:focus{
        border-color: hsl(200, 77%, 52%);
        outline: none;
      }

      .login-button{
        background-color: hsl(200, 77%, 52%);
        border: none;
        border-radius: 0.5rem;
        color: hsl(0, 0%, 100%);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.875rem;
        transition: background-color 0.3s ease;
        width: 100%;
      }

      .login-button:hover{
        background-color: hsl(200, 77%, 45%);
      }

      .login-button:active{
        transform: scale(0.98);
      }

      .error-message{
        background-color: hsl(0, 70%, 95%);
        border-left: 4px solid hsl(0, 70%, 50%);
        border-radius: 0.5rem;
        color: hsl(0, 70%, 40%);
        display: none;
        font-size: 0.9rem;
        margin-top: 1rem;
        padding: 0.75rem;
      }

      .error-message.active{
        display: block;
      }

    </style>

    <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Área de Clientes</h1>
        <p class="login-subtitle">Inicia sesión en tu cuenta</p>
        
        <form class="login-form">
          <div class="form-group">
            <label class="form-label" for="email">Correo</label>
            <input 
              class="form-input" 
              type="text" 
              id="email" 
              name="email"
              placeholder="Ingresa tu correo"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Contraseña</label>
            <input 
              class="form-input" 
              type="password" 
              id="password" 
              name="password"
              placeholder="Ingresa tu contraseña"
              required
            >
          </div>

          <button class="login-button" type="submit">
            Iniciar Sesión
          </button>

          <div class="error-message"></div>
        </form>
      </div>
    </div>
    
    `

    const form = this.shadow.querySelector('form')
    const errorMessage = this.shadow.querySelector('.error-message')

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      errorMessage.classList.remove('active')

      const formData = new FormData(form)
      const formDataJson = Object.fromEntries(formData.entries())

      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/customer/signin`, {
          method: 'POST',
          credentials: 'include', // Importante para las cookies de sesión
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        if (result.ok) {
          const data = await result.json()
          window.location.href = data.redirection
        } else {
          const error = await result.json()
          errorMessage.textContent = error.message || 'Error al iniciar sesión'
          errorMessage.classList.add('active')
        }
      } catch (error) {
        console.error('Error:', error)
        errorMessage.textContent = 'Error de conexión. Por favor, intenta de nuevo.'
        errorMessage.classList.add('active')
      }
    })
  }

  async checkSignin() {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/customer/check-signin`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        const data = await result.json()
        window.location.href = data.redirection
      }
    } catch (error) {
      console.log('No hay sesión activa')
    }
  }
}

customElements.define('login-customer-component', LoginCustomerComponent)
