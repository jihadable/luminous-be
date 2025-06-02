import { Product } from "../../../generated/prisma";

const productMapper = {
    response: (product: Product & { category: { name: string } }) => ({
        ...product,
        price: product.price.toNumber(),
        category_name: product.category.name
    })
}

export default productMapper