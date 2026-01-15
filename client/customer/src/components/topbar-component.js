class Topbar extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.addEventListeners()
  }

  addEventListeners() {
    const loginButton = this.shadow.querySelector('.login-button')
    console.log('Login button:', loginButton)

    if (loginButton) {
      loginButton.addEventListener('click', (e) => {
        console.log('Button clicked!')
        e.preventDefault()
        window.location.href = 'http://dev-youthing.com/admin/login'
      })
    }
  }

  render() {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button {
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
        margin: 0;
      }

      .topbar {
        left: 0;
        padding: 1rem 2rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
      }

      .topbar-container {
        align-items: center;
        display: flex;
        justify-content: flex-end;
        margin: 0 auto;
        max-width: 1280px;
      }

      .login-button {
        background-color: hsl(200, 77%, 52%);
        border-radius: 0.5rem;
        color: hsl(0, 0%, 100%);
        font-size: 1rem;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        transition: background-color 0.3s ease;

        @media (min-width: 768px) {
          font-size: 1.1rem;
          padding: 0.875rem 2rem;
        }
      }

      .login-button:hover {
        background-color: hsl(200, 77%, 42%);
      }
    </style>

    <nav class="topbar">
      <div class="topbar-container">
        <button class="login-button">Login</button>
      </div>
    </nav>
    `
  }
}

customElements.define('topbar-component', Topbar)