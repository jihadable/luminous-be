import { CartProduct, Product } from "../../../generated/prisma";

const cartProductMapper = {
    response: (cartProduct: CartProduct & { product: Product & { category: { name: string } } }) => ({
        ...cartProduct,
        product: { ...cartProduct.product, category_name: cartProduct.product.category.name }
    })
} 

export default cartProductMapper