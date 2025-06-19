class DeleteModal extends HTMLElement {
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

        h1, h2, h3, h4, h5, h6, p{
          margin: 0;
        }

        h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button{
          font-family: "Nunito Sans", serif;
          font-optical-sizing: auto;
        }

        button{
          background-color: transparent;
          border: none;
          cursor: pointer;
          outline: none;
          padding: 0;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000; /* Asegura que esté por encima del resto */
        }

        .modal-content {
            background: white;
            padding: 20px 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            color: black;
        }

        .modal-content h2 {
            margin-bottom: 20px;
        }

        .modal-buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }

        .modal-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
        }

        .btn-si {
            background-color: #d32f2f;
            color: white;
        }

        .btn-no {
            background-color: #aaa;
            color: white;
        }

        .btn-si:hover {
            background-color: #b71c1c;
        }

        .btn-no:hover {
            background-color: #888;
        }
     
      </style>
  
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>¿Estás seguro de eliminar el registro?</h2>
          <div class="modal-buttons">
            <button class="btn-si" >Sí</button>
            <button class="btn-no" >No</button>
          </div>
        </div>
      </div>
      
      `
  }
}

customElements.define('delete-modal-component', DeleteModal)
