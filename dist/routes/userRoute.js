"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post("/test", (req, res) => {
    return res.json(req.body);
});
exports.default = userRouter;
