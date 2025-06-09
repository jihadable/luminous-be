import { Router } from "express";
import { PrismaClient, Role } from "../../generated/prisma";
import CategoryHandler from "../handler/CategoryHandler";
import authMiddleware from "../middleware/authMiddleware";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware";
import CategoryService from "../service/CategoryService";
import categoryValidator from "../validator/categoryValidator";

export default function categoryRouter(db: PrismaClient){
    const service = new CategoryService(db)
    const handler = new CategoryHandler(service, categoryValidator)
    const router = Router()

    router.post("/", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.postCategory)
    router.get("/", handler.getCategories)
    router.get("/:category_id", handler.getCategoryById)
    router.delete("/:category_id", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.deleteCategoryById)

    return router
}