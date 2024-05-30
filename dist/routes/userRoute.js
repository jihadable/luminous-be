"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = (0, express_1.Router)();
// get user profile
userRouter.get("/", authMiddleware_1.verifyToken, userController_1.getUserProfile);
// register
userRouter.post("/register", authMiddleware_1.encryptPassword, userController_1.register);
// login
userRouter.post("/login", userController_1.login);
exports.default = userRouter;
