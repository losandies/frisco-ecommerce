const express = require("express");
const router = express.Router();

const { addItem, getAllItems } = require("../controllers/itemController");

router.post("/addItem", addItem);
router.get("/getItems", getAllItems);

module.exports = router;
