const express = require('express')
const router = express.Router()
const controller = require('../../controllers/customer/customer-controller.js')

router.post('/', controller.create)

module.exports = router
