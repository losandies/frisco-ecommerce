const router = require('express').Router();
router.get('/getItems', require('../lib/asyncHandler')(require('../controllers/itemController').getAllItems));
module.exports = router;
