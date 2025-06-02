import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import CartProductHandler from "../handler/CartProductHandler";
import CartProductService from "../service/CartProductService";

export default function cartProductRouter(db: PrismaClient): Router {
    const service = new CartProductService(db)
    const handler = new CartProductHandler(service)
    const cartProductRoute = Router()

    cartProductRoute.post("/:id", handler.postCartProduct)
    cartProductRoute.get("/:id", handler.getCartProducts)
    cartProductRoute.delete("/:id", handler.deleteCartProduct)

    return cartProductRoute
}