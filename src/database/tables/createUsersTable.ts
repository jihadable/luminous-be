import { pool } from "../database"

export const createUsersTable = async() => {
    const dropQuery: string = "DROP TABLE users;"

    await pool.query(dropQuery)

    const createQuery: string = 
    `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`

    await pool.query(createQuery)
}