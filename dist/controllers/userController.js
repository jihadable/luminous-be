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
exports.login = exports.register = exports.getUserProfile = void 0;
const bcrypt_1 = require("bcrypt");
const userModel_1 = __importDefault(require("../models/userModel"));
const defaultResponse_1 = __importDefault(require("../utils/defaultResponse"));
const serverErrorResponse_1 = __importDefault(require("../utils/serverErrorResponse"));
// get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const user = yield userModel_1.default.findById(user_id);
        if (!user) {
            return res.status(401).json((0, defaultResponse_1.default)(401, false, "Invalid token"));
        }
        return res.status(200).json(Object.assign(Object.assign({}, (0, defaultResponse_1.default)(200, true, "Get user profile successfully")), { user: user.response() }));
    }
    catch (error) {
        return (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.getUserProfile = getUserProfile;
// register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield userModel_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json((0, defaultResponse_1.default)(400, false, "User have already registered"));
        }
        user = yield userModel_1.default.create(Object.assign({}, req.body));
        return res.status(201).json(Object.assign(Object.assign({}, (0, defaultResponse_1.default)(201, true, "User registered")), { token: yield user.generateJWT() }));
    }
    catch (error) {
        return (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.register = register;
// login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json((0, defaultResponse_1.default)(401, false, "Invalid email or password"));
        }
        if (!(0, bcrypt_1.compareSync)(password, user.password)) {
            return res.status(401).json((0, defaultResponse_1.default)(401, false, "Invalid email or password"));
        }
        return res.status(202).json(Object.assign(Object.assign({}, (0, defaultResponse_1.default)(202, true, "User Logged in successfully")), { token: yield user.generateJWT() }));
    }
    catch (error) {
        return (0, serverErrorResponse_1.default)(error, res);
    }
});
exports.login = login;
