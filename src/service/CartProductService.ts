import { PrismaClient } from "../../generated/prisma"

export default class CartProductService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async addCartProduct(cartId: string, productId: string){
        const cartProduct = await this.db.cartProducts.create({
            data: { cart_id: cartId, product_id: productId }
        })

        return cartProduct
    }

    async getCartProducts(cartId: string){
        const cartProducts = await this.db.cartProducts.findMany({
            where: { cart_id: cartId }
        })

        return cartProducts
    }

    async deleteCartProduct(cartId: string, productId: string){
        await this.getCartProducts(cartId)

        await this.db.cartProducts.delete({
            where: { 
                cart_id_product_id: {
                    cart_id: cartId,
                    product_id: productId
                }
            }
        })
    }
}