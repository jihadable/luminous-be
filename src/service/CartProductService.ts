import { PrismaClient } from "../../generated/prisma"
import cartProductMapper from "../utils/mapper/cartProductMapper"

export default class CartProductService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async addCartProduct(cartId: string, productId: string){
        const cartProduct = await this.db.cartProduct.create({
            data: { cart_id: cartId, product_id: productId },
            include: {
                product: {
                    include: {
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return cartProductMapper.response(cartProduct)
    }

    async getCartProducts(cartId: string){
        const cartProducts = await this.db.cartProduct.findMany({
            where: { cart_id: cartId },
            select: {
                id: true,
                product: {
                    include: {
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return cartProducts
    }

    async deleteCartProduct(cartId: string, productId: string){
        await this.getCartProducts(cartId)

        await this.db.cartProduct.delete({
            where: { 
                cart_id_product_id: {
                    cart_id: cartId,
                    product_id: productId
                }
            }
        })
    }
}