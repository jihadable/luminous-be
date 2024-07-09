import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers/productController";

const productRouter = Router()

// get all products
productRouter.get("/", getAllProducts)

// get single product
productRouter.get("/:id", getSingleProduct)

export default productRouter