const express = require("express");
const router = express.Router();

const {
    addItem,
    getAllItems,
    updateItem,
} = require("../controllers/itemController");

router.post("/addItem", addItem);
router.get("/getItems", getAllItems);
router.put("/updateItem", updateItem);

module.exports = router;
