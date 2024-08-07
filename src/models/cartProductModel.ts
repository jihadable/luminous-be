import { pool } from "../database/database"
import { Product } from "./productModel"
import { User } from "./userModel"

type CartProductType = {
    id: number,
    user_id: number,
    product_id: number
}

export const CartProduct = {
    async findByUser(user_id: number){
        const query = "SELECT * FROM cart_products WHERE user_id = $1"

        const { rows } = await pool.query(query, [user_id])

        return rows
    },

    async create(user_id: number, product_id: number){
        const query = "INSERT INTO cart_products (user_id, product_id) VALUES ($1, $2) RETURNING *"

        const { rows } = await pool.query(query, [user_id, product_id])

        return rows[0] || null
    },

    async delete(user_id: number, product_id: number | string){
        const query = "DELETE FROM cart_products WHERE user_id = $1 AND product_id = $2 RETURNING *"

        const { rows } = await pool.query(query, [user_id, product_id])

        return rows[0] || null
    },

    async deleteAll(user_id: number){
        const query = "DELETE FROM cart_products WHERE user_id = $1 RETURNING *"

        const { rows } = await pool.query(query, [user_id])

        return rows
    },

    async findUser(user_id: number){
        const query = "SELECT * FROM users WHERE id = $1"

        const { rows } = await pool.query(query, [user_id])

        return rows[0] || null
    },

    async findProduct(product_id: number){
        const query = "SELECT * FROM products WHERE id = $1"

        const { rows } = await pool.query(query, [product_id])

        return rows[0] || null
    },

    async response(cartProduct: CartProductType){
        const user = await this.findUser(cartProduct.user_id)
        const product = await this.findProduct(cartProduct.product_id)

        return {
            id: cartProduct.id,
            user: user ? User.response(user) : null,
            product: product ? {...Product.response(product), quantity: 1} : null
        }
    }
}