import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../modules/products/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
