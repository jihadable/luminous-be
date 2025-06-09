import { Router } from "express";
import { PrismaClient, Role } from "../../generated/prisma";
import CartProductHandler from "../handler/CartProductHandler";
import authMiddleware from "../middleware/authMiddleware";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware";
import CartProductService from "../service/CartProductService";
import cartProductValidator from "../validator/cartProductValidator";

export default function cartProductRouter(db: PrismaClient){
    const service = new CartProductService(db)
    const handler = new CartProductHandler(service, cartProductValidator)
    const router = Router()

    router.post("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.postCartProduct)
    router.get("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.getCartProducts)
    router.delete("/:cart_id", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.deleteCartProduct)

    return router
}