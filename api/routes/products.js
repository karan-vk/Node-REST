const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const ProductController = require("../Controllers/product");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Product = require("../models/product");

router.get("/", ProductController.product_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.product_create_product
);

router.get("/:productId", ProductController.product_get_product);

router.patch(
  "/:productId",
  checkAuth,
  ProductController.products_update_product
);

router.delete(
  "/:productId",
  checkAuth,
  ProductController.product_delete_product
);

module.exports = router;
