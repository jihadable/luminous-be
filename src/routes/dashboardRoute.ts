import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import getRedis from "../config/redis.js";
import DashboardHandler from "../handler/DashboardHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import DashboardService from "../service/DashboardService.js";

const dashboardRouter = (db: PrismaClient, redis: ReturnType<typeof getRedis>) => {
    const service = new DashboardService(db, redis)
    const handler = new DashboardHandler(service)
    const router = Router()

    router.get("/", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.getDashboardData)

    return router
}

export default dashboardRouter