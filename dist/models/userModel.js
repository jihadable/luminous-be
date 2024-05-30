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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullname: String,
    email: String,
    password: String,
    no_hp: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    collection: "users"
});
// generate token
userSchema.methods.generateJWT = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, jsonwebtoken_1.sign)({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    });
};
// user response
userSchema.methods.response = function () {
    return {
        fullname: this.fullname,
        email: this.email,
        no_hp: this.no_hp,
        address: this.address
    };
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
