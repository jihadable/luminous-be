import { pool } from "../database"

export const createCartProductsTable = async() => {
    const dropQuery: string = "DROP TABLE IF EXISTS cart_products"

    await pool.query(dropQuery)

    const createQuery: string = 
    `CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`

    await pool.query(createQuery)
}