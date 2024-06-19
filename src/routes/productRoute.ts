import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers/productController";
import { idValidation } from "../middlewares/idValidationMiddleware";

const productRouter = Router()

// get all products
productRouter.get("/", getAllProducts)

// get single product
productRouter.get("/:id", idValidation, getSingleProduct)

export default productRouter