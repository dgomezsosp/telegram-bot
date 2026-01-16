// API: api/src/routes/auth/auth-customers.js
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth/auth-customer-controller.js')

router.post('/signin', controller.signin)
router.get('/check-signin', controller.checkSignin)
router.get('/current', controller.getCurrentCustomer)
router.post('/logout', controller.logout)
router.post('/reset', controller.reset)

module.exports = router
