
const express = require('express')
const controller = require('../controller/home.controller')
const middleware = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/',middleware.requireAuth,controller.home)
router.post('/out',controller.out)
router.post('/create',controller.homePost)
router.post('/confirm',controller.confirmComplete)
router.post('/confirmDelete',controller.confirmDelete)

module.exports = router


