class ActivationComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
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

    </style>

    <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Bienvenido</h1>
        <p class="login-subtitle">Inicia sesión en tu cuenta</p>
        
        <form class="login-form">
          <div class="form-group">
            <label class="form-label" name="password">Contraseña</label>
            <input 
              class="form-input" 
              type="password" 
              id="password" 
              name="password"
              placeholder="Ingresa tu contraseña"
            >
          </div>

          <div class="form-group">
            <label class="form-label" name="repeat-password">Repetir Contraseña</label>
            <input 
              class="form-input" 
              type="password" 
              id="confirm-password" 
              name="repeat-password"
              placeholder="Repite tu contraseña"
            >
          </div>

          <button class="login-button" type="submit">
            Crear contraseña
          </button>

          <div class="message">
            <span></span>
          </div>
        </form>
      </div>
    </div>
    
    `

    this.shadow.querySelector('form').addEventListener('submit', async (event) => {
      event.preventDefault()
      console.log('hola')
      const password = this.shadow.querySelector('input[name="password"]').value
      const repeatPassword = this.shadow.querySelector('input[name="repeat-password"]').value
      const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

      if (password !== repeatPassword) {
        this.shadow.querySelector('.message span').textContent = 'Las contraseñas no coinciden'
        return
      }

      if (!password || !repeatPassword) {
        this.shadow.querySelector('.message span').textContent = 'Los campos no pueden estar vacios'
        return
      }

      if (!regex.test(password)) {
        this.shadow.querySelector('.message span').textContent = 'La contraseña no cumple con los requisitos mínimos'
        return
      }

      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      })

      if (response.ok) {
        this.shadow.querySelector('.message span').textContent = 'Cuenta activada correctamente'
        const form = this.shadow.querySelector('.form')
        form.reset()
      } else {
        const data = await response.json()
        this.shadow.querySelector('.message span').textContent = data.message
      }
    })
  }
}

customElements.define('activation-component', ActivationComponent)
