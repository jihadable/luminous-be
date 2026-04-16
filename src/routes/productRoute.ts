import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import ProductHandler from "../handler/ProductHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import uploadImage from "../middleware/storageMiddleware.js";
import ProductService from "../service/ProductService.js";
import StorageService from "../service/StorageService.js";
import productValidator from "../validator/productValidator.js";

const productRouter = (db: PrismaClient) => {
    const storageService = new StorageService()
    const service = new ProductService(db, storageService)
    const handler = new ProductHandler(service, productValidator)
    const router = Router()

    router.post("/", authMiddleware, authorizeRoleMiddleware(Role.admin), uploadImage.single("image"), handler.postProduct)
    router.get("/", handler.getProducts)
    router.get("/:product_id", handler.getProductById)
    router.put("/:product_id", authMiddleware, authorizeRoleMiddleware(Role.admin), uploadImage.single("image"), handler.updateProductById)
    router.delete("/:product_id", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.deleteProductById)

    return router
}

export default productRouter