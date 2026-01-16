// API: api/src/routes/customer/customers.js
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/customer/customer-controller.js')
const authUserCookie = require('../../middlewares/auth-user-cookie.js')
// NOTA: No usamos authCustomerCookie aquí porque esto es para admin

// Ruta PÚBLICA (sin middleware) - Para registro desde formulario
router.post('/', controller.create)

// Rutas PRIVADAS DE ADMIN (con middleware de user/admin)
// Solo los administradores pueden ver/editar todos los customers
router.get('/', authUserCookie, controller.findAll)
router.get('/:id', authUserCookie, controller.findOne)
router.put('/:id', authUserCookie, controller.update)
router.delete('/:id', authUserCookie, controller.delete)

module.exports = router