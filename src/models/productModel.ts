import { pool } from "../database/database"

type ProductType = {
    id: number,
    slug: string,
    name: string,
    price: number | string,
    image: string,
    texture: string,
    weight: number | string,
    size: string,
    description: string,
    category: string
}

export const Product = {
    async findAll(){
        const query: string = "SELECT * FROM products"

        const { rows } = await pool.query(query)

        return rows
    },

    response(product: ProductType){
        return {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: parseFloat(product.price as string),
            image: product.image,
            texture: product.texture,
            weight: parseFloat(product.weight as string),
            size: product.size,
            description: product.description,
            category: product.category
        }
    }
}