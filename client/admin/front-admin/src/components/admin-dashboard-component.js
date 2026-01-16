class AdminDashboardComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
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

      
    </style>

    <div>
      <h1>Admin Dashboard</h1>
    </div>
    
    `


  }


}

customElements.define('admin-dashboard-component', AdminDashboardComponent)