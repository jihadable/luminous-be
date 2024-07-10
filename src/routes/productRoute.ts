import { Router } from "express";
import { getAllProducts } from "../controllers/productController";

const productRouter = Router()

// get all products
productRouter.get("/", getAllProducts)

export default productRouter