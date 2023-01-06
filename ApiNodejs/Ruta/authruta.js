const {Router}= require('express');
const { login } = require('../Controllers/authcontroller');

const router = Router();

router.post('/',login)

module.exports = router;
