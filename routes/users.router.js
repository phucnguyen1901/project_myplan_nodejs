

const controller = require('../controller/users.controller');
const express = require('express');

const router = express.Router();

router.get('/',controller.homeUser);



module.exports = router;


