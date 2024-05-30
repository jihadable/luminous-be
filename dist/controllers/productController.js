"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const defaultResponse_1 = __importDefault(require("../utils/defaultResponse"));
const serverErrorResponse_1 = __importDefault(require("../utils/serverErrorResponse"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        return res.status(200).json(Object.assign(Object.assign({}, (0, defaultResponse_1.default)(200, true, "Get all products successfully")), { products: products.map(product => product.response()) }));
    }
    catch (error) {
        return (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.getAllProducts = getAllProducts;
