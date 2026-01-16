// CLIENT: client/customer/src/components/page-component.js
class PageComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.basePath = this.getAttribute('base-path') || ''
  }

  connectedCallback() {
    this.render()
    window.onpopstate = () => this.handleRouteChange()
  }

  handleRouteChange() {
    this.render()
  }

  render() {
    const path = window.location.pathname
    this.getTemplate(path)
  }

  async getTemplate(path) {
    console.log('Path actual:', path)

    const routes = {
      '/': 'home.html',
      '/login-customer': 'login-customer.html',
      '/customer-dashboard': 'customer-dashboard.html',
      '/cuenta/activacion': 'activation.html'
    }

    const filename = routes[path] || '404.html'

    await this.loadPage(filename)
  }

  async loadPage(filename) {
    try {
      const response = await fetch(`${this.basePath}/pages/${filename}`)
      const html = await response.text()

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          this.shadowRoot.innerHTML = html
          document.documentElement.scrollTop = 0
        })
      } else {
        this.shadowRoot.innerHTML = html
        document.documentElement.scrollTop = 0
      }
    } catch (error) {
      console.error('Error cargando página:', error)
      this.shadowRoot.innerHTML = '<h1>Error cargando la página</h1>'
    }
  }
}

customElements.define('page-component', PageComponent)
