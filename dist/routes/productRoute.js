"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const productRouter = (0, express_1.Router)();
// get all products
productRouter.get("/", productController_1.getAllProducts);
exports.default = productRouter;
