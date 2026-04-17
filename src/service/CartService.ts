import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/NotFoundError.js";

class CartService {
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
            throw new NotFoundError("Cart not found")
        }

        return cart
    }
}

export default CartService