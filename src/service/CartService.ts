import { PrismaClient } from "../../generated/prisma";
import NotFoundError from "../errors/NotFoundError";

export default class CartService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async addCart(userId: string){
        const cart = await this.db.cart.create({
            data: { user_id: userId }
        })

        return cart
    }

    async getCartById(id: string){
        const cart = await this.db.cart.findUnique({
            where: { id }
        })

        if (!cart){
            throw new NotFoundError("Keranjang tidak ditemukan")
        }

        return cart
    }
}