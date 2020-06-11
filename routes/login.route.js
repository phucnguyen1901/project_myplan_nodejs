
const express = require('express')
const controller = require('../controller/login.controller')
const router = express.Router()

router.get('/',controller.login)

module.exports = router;