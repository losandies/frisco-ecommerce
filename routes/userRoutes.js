const router = require('express').Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');
const handle = require('../lib/asyncHandler');
router.post('/register', handle(controller.registerUser));
router.post('/login', handle(controller.loginUser));
router.get('/getCurrentUser', auth, handle(controller.getCurrentUser));
router.post('/updateAddress', auth, handle(controller.updateUserAddress));
module.exports = router;
