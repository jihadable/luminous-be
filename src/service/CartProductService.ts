import { PrismaClient } from "../../generated/prisma"
import NotFoundError from "../errors/NotFoundError"

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
                        category: true
                    }
                }
            }
        })

        return cartProduct
    }

    async getCartProducts(cartId: string){
        const cartProducts = await this.db.cartProduct.findMany({
            where: { cart_id: cartId },
            include: {
                product: {
                    include: {
                        category: true
                    }
                }
            }
        })

        return cartProducts
    }

    async getCartProduct(cartId: string, productId: string){
        const cartProduct = await this.db.cartProduct.findUnique({
            where: { 
                cart_id_product_id: {
                    cart_id: cartId,
                    product_id: productId
                } 
            }
        })

        if (!cartProduct){
            throw new NotFoundError("Produk keranjang tidak ditemukan")
        }

        return cartProduct
    }

    async deleteCartProduct(cartId: string, productId: string){
        await this.getCartProduct(cartId, productId)

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