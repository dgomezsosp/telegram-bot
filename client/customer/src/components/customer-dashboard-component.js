// CLIENT: client/customer/src/components/customer-dashboard-component.js
class CustomerDashboardComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.customerData = null
    this.apiUrl = import.meta.env.VITE_API_URL || window.location.origin
  }

  async connectedCallback() {
    await this.checkAuth()
    await this.loadCustomerData()
    this.render()
  }

  async checkAuth() {
    try {
      const result = await fetch(`${this.apiUrl}/api/auth/customer/check-signin`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!result.ok) {
        window.location.href = '/login-customer'
      }
    } catch (error) {
      console.log(error)
      window.location.href = '/login-customer'
    }
  }

  async loadCustomerData() {
    try {
      const result = await fetch(`${this.apiUrl}/api/auth/customer/current`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        this.customerData = await result.json()
      }
    } catch (error) {
      console.error('Error cargando datos del customer:', error)
    }
  }

  async handleLogout() {
    try {
      // Llamar al endpoint de logout para destruir la sesión
      const result = await fetch(`${this.apiUrl}/api/auth/customer/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        // Redirigir al login después de cerrar sesión exitosamente
        window.location.href = '/login-customer'
      } else {
        console.error('Error al cerrar sesión')
        // Aun así redirigir (por si acaso)
        window.location.href = '/login-customer'
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      // Aun así redirigir (por si acaso)
      window.location.href = '/login-customer'
    }
  }

  render() {
    const customerName = this.customerData?.name || 'Usuario'
    const customerEmail = this.customerData?.email || ''

    this.shadow.innerHTML =
    /* html */`
    <style>

      *{
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, label, input, button{
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
      }

      .dashboard-container{
        align-items: center;
        background: linear-gradient(135deg, hsl(200, 77%, 52%) 0%, hsl(200, 77%, 35%) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        width: 100%;
      }

      .dashboard-box{
        background-color: hsl(0, 0%, 100%);
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        max-width: 800px;
        padding: 3rem 2rem;
        text-align: center;
        width: 100%;
      }

      .dashboard-title{
        color: hsl(200, 77%, 52%);
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      .dashboard-subtitle{
        color: hsl(0, 0%, 60%);
        font-size: 1rem;
        margin: 0 0 2rem 0;
      }

      .customer-info{
        background-color: hsl(200, 77%, 98%);
        border-left: 4px solid hsl(200, 77%, 52%);
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        text-align: left;
      }

      .customer-info-row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;
      }

      .customer-info-row:last-child{
        margin-bottom: 0;
      }

      .customer-info-label{
        color: hsl(0, 0%, 40%);
        font-size: 0.9rem;
        font-weight: 600;
      }

      .customer-info-value{
        color: hsl(0, 0%, 20%);
        font-size: 1rem;
        font-weight: 500;
      }

      .dashboard-content{
        background-color: hsl(200, 77%, 98%);
        border-left: 4px solid hsl(200, 77%, 52%);
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        text-align: left;
      }

      .dashboard-content p{
        color: hsl(0, 0%, 30%);
        line-height: 1.6;
        margin: 0.5rem 0;
      }

      .logout-button{
        background-color: hsl(0, 70%, 50%);
        border: none;
        border-radius: 0.5rem;
        color: hsl(0, 0%, 100%);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.875rem 2rem;
        transition: background-color 0.3s ease;
      }

      .logout-button:hover{
        background-color: hsl(0, 70%, 45%);
      }

      .logout-button:active{
        transform: scale(0.98);
      }

      .logout-button:disabled{
        background-color: hsl(0, 0%, 70%);
        cursor: not-allowed;
      }

    </style>

    <div class="dashboard-container">
      <div class="dashboard-box">
        <h1 class="dashboard-title">¡Hola, ${customerName}!</h1>
        <p class="dashboard-subtitle">Bienvenido a tu panel de cliente</p>
        
        <div class="customer-info">
          <div class="customer-info-row">
            <span class="customer-info-label">Nombre:</span>
            <span class="customer-info-value">${customerName}</span>
          </div>
          <div class="customer-info-row">
            <span class="customer-info-label">Email:</span>
            <span class="customer-info-value">${customerEmail}</span>
          </div>
        </div>

        <div class="dashboard-content">
          <p>✅ Has iniciado sesión correctamente como cliente.</p>
          <p>🎉 Tu cuenta está activa y lista para usar.</p>
          <p>📊 Aquí podrás acceder a todos tus servicios y funcionalidades.</p>
        </div>

        <button class="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
    
    `

    // NUEVO: Manejar el logout correctamente
    const logoutButton = this.shadow.querySelector('.logout-button')
    logoutButton.addEventListener('click', async () => {
      // Deshabilitar el botón mientras se procesa
      logoutButton.disabled = true
      logoutButton.textContent = 'Cerrando sesión...'

      await this.handleLogout()
    })
  }
}

customElements.define('customer-dashboard-component', CustomerDashboardComponent)
