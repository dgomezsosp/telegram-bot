const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('POST request to the homepage USERS')
})

router.get('/', (req, res) => {
  console.log(req.query)
  res.send('GET request to the homepage USERS')
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('GET request to the homepage USERS')
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  res.send('PUT request to the homepage USERS')
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('DELETE request to the homepage USERS')
})

module.exports = router
