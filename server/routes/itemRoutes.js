const express = require("express");
const router = express.Router();

const {
    addItem,
    getAllItems,
    updateItem,
    getItem,
} = require("../controllers/itemController");

router.post("/addItem", addItem);
router.get("/getItems", getAllItems);
router.put("/updateItem", updateItem);
router.get("/getItem", getItem);

module.exports = router;
