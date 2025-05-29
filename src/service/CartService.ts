import { PrismaClient } from "../../generated/prisma";

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
}