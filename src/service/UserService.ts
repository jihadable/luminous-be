import { compareSync, hash } from "bcrypt";
import { PrismaClient, Role } from "../../generated/prisma";
import BadRequestError from "../errors/BadRequestError";
import userMapper from "../utils/mapper/userMapper";
import CartService from "./CartService";

export default class UserService {
    private db: PrismaClient
    private cartService: CartService

    constructor(db: PrismaClient, cartService: CartService){
        this.db = db
        this.cartService = cartService
    }

    async addUser({ name, email, password }: { name: string, email: string, password: string }){
        const role = Role.customer
        const hashedPassword = await hash(password, 10)
        const user = await this.db.user.create({
            data: { name, role, email, password: hashedPassword }
        })
        await this.cartService.addCart(user.id)

        return userMapper.response(user)
    }

    async updateUser(id: string, { name }: { name: string }){
        const user = await this.db.user.update({
            where: { id },
            data: { name }
        })

        return userMapper.response(user)
    }

    async verifyUser(email: string, password: string){
        const user = await this.db.user.findUnique({
            where: { email }
        })

        if (!user){
            throw new BadRequestError("Email atau password salah")
        }

        if (!compareSync(password, user.password)){
            throw new BadRequestError("Email atau password salah")
        }

        return userMapper.response(user)
    }
}

