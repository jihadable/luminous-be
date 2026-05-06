import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import getRedis from "../config/redis.js";
import CategoryHandler from "../handler/CategoryHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import CategoryService from "../service/CategoryService.js";
import categoryValidator from "../validator/categoryValidator.js";

const categoryRouter = (db: PrismaClient, redis: ReturnType<typeof getRedis>) => {
    const service = new CategoryService(db, redis)
    const handler = new CategoryHandler(service, categoryValidator)
    const router = Router()

    router.post("/", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.postCategory)
    router.get("/", handler.getCategories)
    router.get("/:category_id", handler.getCategoryById)
    router.delete("/:category_id", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.deleteCategoryById)

    return router
}

export default categoryRouter