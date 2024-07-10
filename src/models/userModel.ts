import { pool } from "../database/database";

type UserType = {
    fullname: string,
    email: string,
    password: string,
    phone: string,
    address: string
}

export const User = {
    async findById(id: number){
        const query: string = "SELECT * FROM users WHERE id = $1"

        const { rows } = await pool.query(query, [id])

        return rows[0]
    },

    async findByEmail(email: string){
        const query: string = "SELECT * FROM users WHERE email = $1"

        const { rows } = await pool.query(query, [email])

        return rows[0]
    },

    async create(data: UserType){
        const query: string = "INSERT INTO users (fullname, email, password, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *"

        const { rows } = await pool.query(query, [data.fullname, data.email, data.password, data.phone, data.address])

        return rows[0]
    },

    async update(id: number, data: { phone: string, address: string }){
        const query: string = "UPDATE users SET phone = $1, address = $2 WHERE id = $3 RETURNING *"

        const { rows } = await pool.query(query, [data.phone, data.address, id])

        return rows[0]
    },

    response(user: UserType){
        return {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
    }
}