import { Router } from "express";
import { deleteAllCartProducts, deleteCartProduct, getAllCartProducts, storeCartProduct } from "../controllers/cartProductController";
import { verifyToken } from "../middlewares/authMiddleware";

const cartProductRouter = Router()

cartProductRouter.use(verifyToken)

// get all cart products by user
cartProductRouter.get("/", getAllCartProducts)

// store cart product
cartProductRouter.post("/", storeCartProduct)

// delete single cart product
cartProductRouter.delete("/:product_id", deleteCartProduct)

// delete all cart products
cartProductRouter.delete("/", deleteAllCartProducts)

export default cartProductRouter