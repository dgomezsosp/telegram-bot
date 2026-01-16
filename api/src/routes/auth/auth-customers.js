// API: api/src/routes/auth/auth-customers.js
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth/auth-customer-controller.js')
const authCustomerCookie = require('../../middlewares/auth-customer-cookie.js')

// Rutas PÚBLICAS (sin middleware)
router.post('/signin', controller.signin)
router.post('/reset', controller.reset)

// Rutas PRIVADAS (con middleware)
router.get('/check-signin', authCustomerCookie, controller.checkSignin)
router.get('/current', authCustomerCookie, controller.getCurrentCustomer)
router.post('/logout', authCustomerCookie, controller.logout)

module.exports = router
