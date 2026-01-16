// API: api/src/routes/customer/customers.js
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/customer/customer-controller.js')

// Ruta POST sin middleware de autenticación para permitir registro público
router.post('/', controller.create)

// Las demás rutas podrían requerir autenticación si las usas en el admin
// router.get('/', authMiddleware, controller.findAll)
// router.get('/:id', authMiddleware, controller.findOne)
// router.put('/:id', authMiddleware, controller.update)
// router.delete('/:id', authMiddleware, controller.delete)

module.exports = router