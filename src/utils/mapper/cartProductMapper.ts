import { CartProduct, Category, Product } from "@prisma/client";
import productMapper from "./productMapper.js";

const cartProductMapper = {
    response: (cartProduct: CartProduct & { product: Product & { category: Category } }) => ({
        id: cartProduct.id,
        cart_id: cartProduct.cart_id,
        quantity: cartProduct.quantity,
        product: productMapper.response(cartProduct.product)
    })
} 

export default cartProductMapper