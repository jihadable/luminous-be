import { Category, Product } from "../../../generated/prisma";

const productMapper = {
    response: (product: Product & { category: Category }) => ({
        id: product.id,
        name: product.name,
        price: product.price.toNumber(),
        stock: product.stock,
        texture: product.texture,
        weight: product.weight,
        size: product.size,
        description: product.description,
        image_url: product.image_url,
        created_at: product.created_at,
        updated_at: product.updated_at,
        category: {
            id: product.category.id,
            name: product.category.name
        }
    })
}

export default productMapper