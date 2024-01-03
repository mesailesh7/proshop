import express from "express";
// import products from "../data/products.js";
const router = express.Router();
// dont forget to put .js while importing js file
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

// router.get(
//   `/:id`,
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     // const product = products.find((p) => p._id === req.params.id);

//     if (product) {
//       return res.json(product);
//     } else {
//       res.status(404);
//       throw new Error("Resource Not Found");
//     }
//   })
// );

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
