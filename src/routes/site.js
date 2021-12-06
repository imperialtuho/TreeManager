const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.post('/apidata',siteController.apidata)
router.get('/api', siteController.api) //GET DATA TO CLIENT SIDE FOR MAPPING
router.get('/geoapi', siteController.geoapi) //GET DATA TO CLIENT SIDE FOR MAPPING
router.get('/', siteController.index)


module.exports = router