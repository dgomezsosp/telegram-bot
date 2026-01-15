class PageComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.basePath = this.getAttribute('base-path') || ''
  }

  connectedCallback() {
    this.checkSignin()
    this.render()
    // Si cambia la url se hace esta función, que ejecuta de nuevo el render
    window.onpopstate = () => this.handleRouteChange()
  }

  handleRouteChange() {
    this.render()
  }

  // Se ejecuta el render cuando se entra en la página y cuando se cambiar de url.
  render() {
    // Coge la url y la guarda en 'path'
    const path = window.location.pathname
    this.getTemplate(path)
  }



  async getTemplate(path) {
    const routes = {
      '/admin/usuarios': 'users.html',
      '/admin/eventos': 'events.html',
      '/admin/categorias-de-eventos': 'event-categories.html',
      '/admin/bots': 'bots.html',
      '/admin/clientes': 'customers.html',
      '/admin/promotores': 'promoters.html',
      '/admin/faqs': 'faqs.html',
      '/admin/idiomas': 'languages.html',
      '/admin/lugares': 'spots.html',
      '/admin/titulos-caracteristicas': 'features-titles.html',
      '/admin/hero': 'hero.html',
      '/admin/cards': 'cards.html',
      '/admin/formularios': 'subscription-forms.html',
    }
    // guardar el filename correspondiente a la ruta de la url.
    const filename = routes[path] || '404.html'

    // Se le pasa el nombre del archivo a loadPage().
    await this.loadPage(filename)
  }

  async checkSignin() {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/check-signin`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        const data = await result.json()
        window.location.href = data.redirection
      }
    } catch (error) {
      console.log(error)
    }
  }

  async loadPage(filename) {
    const response = await fetch(`${this.basePath}/pages/${filename}`)
    // Lo convierte en texto.
    const html = await response.text()

    document.startViewTransition(() => {
      this.shadowRoot.innerHTML = html
      document.documentElement.scrollTop = 0
    })
  }
}

customElements.define('page-component', PageComponent)
