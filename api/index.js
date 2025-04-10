global.__basedir = __dirname
const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json({ limit: '10mb', extended: true }))

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('POST request to the homepage')
})

// router.get('/', (req, res) => {
//   console.log(req.query)
//   res.send('GET request to the homepage')
// })

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('GET request to the homepage')
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  res.send('PUT request to the homepage')
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('DELETE request to the homepage')
})

// end point para sumar dos numeros que vienen en la url
// router.get('/:primerNumero/:segundoNumero', (req, res) => {
//   const suma = parseInt(req.params.primerNumero) + parseInt(req.params.segundoNumero)
//   // res.send('GET request to the homepage')
//   res.send(suma)
// })

router.get('/', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Jim Doe', age: 35 },
    { id: 4, name: 'Jack Doe', age: 40 },
    { id: 5, name: 'Jill Doe', age: 45 },
  ]

  const mayoresDeTreinta = users.filter(user => user.age > parseInt(req.query.age))

  console.log(req.query)
  res.send(mayoresDeTreinta)
})

// app.use('/api/admin/users/', router)

// ruta para sumar dos sumeros que vienen en la url
// app.use('/api/admin/users/sumar/', router)
app.use('/api/admin/users/filtrar/', router)

app.listen(8080, () => {
  console.log('El servidor está corriendo en el puerto 8080.')
})
