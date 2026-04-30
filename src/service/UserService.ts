import { PrismaClient, Role } from "@prisma/client";
import { compareSync, hash } from "bcrypt";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";

class UserService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async getUsers({ role, is_email_verified, page = 1, limit = 20 }: { role?: Role, is_email_verified?: boolean, page?: number, limit?: number }){
        const skip = (page - 1) * limit
        
        const where = {
            ...(role !== undefined && { role }),
            ...(is_email_verified !== undefined && { is_email_verified })
        }

        const [users, totalUsers] = await Promise.all([
            this.db.user.findMany({
                where,
                skip,
                take: limit
            }),
            this.db.user.count({ where })
        ])

        return {
            users,
            pagination: {
                total: totalUsers,
                page,
                limit,
                total_pages: Math.ceil(totalUsers/limit)
            }
        }
    }

    async addUser({ name, email, password, role, phone, address }: { name: string, email: string, password: string, role: Role, phone: string, address: string }){
        return await this.db.$transaction(async(tx) => {
            const hashedPassword = await hash(password, 10)
            const user = await tx.user.create({
                data: { name, role, email, password: hashedPassword, phone, address }
            })

            const cart = await tx.cart.create({
                data: {
                    user_id: user.id
                }
            })

            return {...user, cart}
        })
    }

    async getUserById(id: string){
        const user = await this.db.user.findUnique({
            where: { id },
            include: {
                cart: true
            }
        })

        if (!user){
            throw new NotFoundError("User not found")
        }

        return user
    }

    async updateUser(id: string, { name, phone, address }: { name: string, phone: string, address: string }){
        const user = await this.db.user.update({
            where: { id },
            data: { name, phone, address },
            include: {
                cart: true
            }
        })

        return user
    }

    async verifyUser(email: string, password: string){
        const user = await this.db.user.findUnique({
            where: { email },
            include: {
                cart: true
            }
        })

        if (!user){
            throw new BadRequestError("Email or password incorrect")
        }

        if (!compareSync(password, user.password)){
            throw new BadRequestError("Email or password incorrect")
        }

        return user
    }
}

export default UserService