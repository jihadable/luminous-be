import { PrismaClient, Role } from "@prisma/client";
import { compareSync, hash } from "bcrypt";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import CartService from "./CartService.js";

class UserService {
    private db: PrismaClient
    private cartService: CartService

    constructor(db: PrismaClient, cartService: CartService){
        this.db = db
        this.cartService = cartService
    }

    async addUser({ name, email, password, phone, address }: { name: string, email: string, password: string, phone: string, address: string }){
        const role = Role.customer
        const hashedPassword = await hash(password, 10)
        const user = await this.db.user.create({
            data: { name, role, email, password: hashedPassword, phone, address },
            include: {
                cart: true
            }
        })
        const cart = await this.cartService.addCart(user.id)

        return {...user, cart }
    }

    async getUserById(id: string){
        const user = await this.db.user.findUnique({
            where: { id },
            include: {
                cart: true
            }
        })

        if (!user){
            throw new NotFoundError("Pengguna tidak ditemukan")
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
            throw new BadRequestError("Email atau password salah")
        }

        if (!compareSync(password, user.password)){
            throw new BadRequestError("Email atau password salah")
        }

        return user
    }
}

export default UserService