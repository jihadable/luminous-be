import { CartProduct, Category, Product } from "../../../generated/prisma";
import productMapper from "./productMapper";

const cartProductMapper = {
    response: (cartProduct: CartProduct & { product: Product & { category: Category } }) => ({
        id: cartProduct.id,
        cart_id: cartProduct.cart_id,
        product: productMapper.response(cartProduct.product)
    })
} 

export default cartProductMapper