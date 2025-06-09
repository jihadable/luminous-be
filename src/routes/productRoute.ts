import { Router } from "express";
import { PrismaClient, Role } from "../../generated/prisma";
import ProductHandler from "../handler/ProductHandler";
import authMiddleware from "../middleware/authMiddleware";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware";
import uploadImage from "../middleware/storageMiddleware";
import ProductService from "../service/ProductService";
import StorageService from "../service/StorageService";
import productValidator from "../validator/productValidator";

export default function productRouter(db: PrismaClient){
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