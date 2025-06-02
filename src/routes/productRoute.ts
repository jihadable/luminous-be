import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import ProductHandler from "../handler/ProductHandler";
import uploadImage from "../middleware/storageMiddleware";
import ProductService from "../service/ProductService";
import StorageService from "../service/StorageService";

export default function productRouter(db: PrismaClient): Router {
    const storageService = new StorageService()
    const service = new ProductService(db, storageService)
    const handler = new ProductHandler(service)
    const productRoute = Router()

    productRoute.post("/", uploadImage.single("image"), handler.postProduct)
    productRoute.get("/", handler.getProducts)
    productRoute.get("/:id", handler.getProductById)
    productRoute.put("/:id", uploadImage.single("image"), handler.updateProductById)
    productRoute.delete("/:id", handler.deleteProductById)

    return productRoute
}