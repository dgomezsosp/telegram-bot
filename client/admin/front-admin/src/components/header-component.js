class Header extends HTMLElement {
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

      * {
        box-sizing: border-box;
      }

      header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 40px 20px;
      }
   
    </style>

    <header>
      <slot></slot>
    </header>
    
    `
  }
}

customElements.define('header-component', Header)
