"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    img: String,
    texture: String,
    weight: Number,
    size: String,
    description: String,
    category: [String],
    stock: Number
}, {
    timestamps: true,
    collection: "products"
});
// product response
productSchema.methods.response = function () {
    return {
        name: this.name,
        price: this.price,
        img: this.img,
        texture: this.texture,
        weight: this.weight,
        size: this.size,
        description: this.description,
        category: this.category,
        stock: this.stock
    };
};
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
