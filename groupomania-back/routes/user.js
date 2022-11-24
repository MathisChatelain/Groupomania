const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const userCtrl = require("../controllers/userControl.js");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;