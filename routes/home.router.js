
const express = require('express')
const controller = require('../controller/home.controller')
const router = express.Router()

router.get('/',controller.home)

module.exports = router


