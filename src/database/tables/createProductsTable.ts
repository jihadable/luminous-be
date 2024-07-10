import { pool } from "../database"

export const createProductsTable = async() => {
    const dropQuery: string = "DROP TABLE products;"

    await pool.query(dropQuery)

    const createQuery: string = 
    `CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        texture VARCHAR(50) NOT NULL,
        weight DECIMAL(5, 2) NOT NULL,
        size VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    await pool.query(createQuery)
}