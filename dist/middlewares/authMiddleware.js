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
exports.verifyToken = exports.encryptPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const defaultResponse_1 = __importDefault(require("../utils/defaultResponse"));
const serverErrorResponse_1 = __importDefault(require("../utils/serverErrorResponse"));
// encrypt password
const encryptPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = yield (0, bcrypt_1.hash)(req.body.password, 10);
        next();
    }
    catch (error) {
        (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.encryptPassword = encryptPassword;
// extract user_id from authorization token
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            return res.status(401).json((0, defaultResponse_1.default)(401, false, "Token not provided"));
        }
        const token = authorization.split(" ")[1];
        const { id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.body.user_id = id;
        next();
    }
    catch (error) {
        (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.verifyToken = verifyToken;
