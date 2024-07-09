import { sign } from "jsonwebtoken";

type UserType = {
    id: number,
    fullname: string,
    email: string,
    password: string,
    phone: string | null,
    address: string | null
}

export const User = {
    async findById(id: number){

    },

    async findByEmail(email: string){

    },

    async create(data: UserType){

    },

    async update(id: number){

    },

    async generateJWT(id: number){
        return await sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
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