import { hash } from "bcrypt"
import { Role } from "../../../generated/prisma"

export default async function getUsers() {
    const password = process.env.PRIVATE_PASSWORD || ""

    return [
        {
            role: Role.admin,
            email: "luminousadmin@gmail.com",
            name: "luminous admin",
            password: await hash(password, 10),
        },
        {
            role: Role.customer,
            email: "umarjihad@gmail.com",
            name: "umar jihad",
            password: await hash(password, 10),
        }
    ]
}