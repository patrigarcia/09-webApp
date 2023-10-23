const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/:name", ProductController.getByName);
router.put("/:name", ProductController.updateByName);
router.delete("/products/:id", ProductController.delete);

module.exports = router;
