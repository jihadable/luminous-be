import { pool } from "../database/database"

type ProductType = {
    id: number,
    slug: string,
    name: string,
    price: number,
    img: string,
    texture: string,
    weight: number,
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
            slug: product.slug,
            name: product.name,
            price: product.price,
            img: product.img,
            texture: product.texture,
            weight: product.weight as number,
            size: product.size,
            description: product.description,
            category: product.category
        }
    }
}