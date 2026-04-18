import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import DashboardHandler from "../handler/DashboardHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import DashboardService from "../service/DashboardService.js";

const dashboardRouter = (db: PrismaClient) => {
    const service = new DashboardService(db)
    const handler = new DashboardHandler(service)
    const router = Router()

    router.get("/", authMiddleware, authorizeRoleMiddleware(Role.admin), handler.getDashboardData)

    return router
}

export default dashboardRouter