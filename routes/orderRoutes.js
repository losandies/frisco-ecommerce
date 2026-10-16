const router = require('express').Router();
const { createOrder, getAllOrders } = require('../controllers/orderController');
const handle = require('../lib/asyncHandler');
router.use(require('../middleware/auth'));
router.post('/placeOrder', handle(createOrder));
router.get('/allOrders', handle(getAllOrders));
module.exports = router;
