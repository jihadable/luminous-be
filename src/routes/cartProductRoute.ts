import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import CartProductHandler from "../handler/CartProductHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import CartProductService from "../service/CartProductService.js";
import CartService from "../service/CartService.js";
import cartProductValidator from "../validator/cartProductValidator.js";

const cartProductRouter = (db: PrismaClient) => {
    const cartService = new CartService(db)
    const service = new CartProductService(db, cartService)
    const handler = new CartProductHandler(service, cartProductValidator)
    const router = Router()

    router.post("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.postCartProduct)
    router.get("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.getCartProducts)
    router.put("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.updateCartProduct)
    router.delete("/:cart_id/products/:product_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.deleteCartProduct)

    return router
}

export default cartProductRouter