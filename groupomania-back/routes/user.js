const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/userControl.js");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getUser);

module.exports = router;