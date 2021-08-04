const express = require('express')
const router = express.Router()

const errorController = require('../app/controllers/ErrorController')



// router.get('/create', adminController.create)
router.get('/', errorController.error404)

module.exports = router