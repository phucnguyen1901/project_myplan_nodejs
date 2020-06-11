

const controller = require('../controller/users.controller');
const express = require('express');

const router = express.Router();

router.post('/',controller.homeUser);



module.exports = router;


