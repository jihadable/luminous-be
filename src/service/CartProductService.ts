import { PrismaClient } from "../../generated/prisma"
import NotFoundError from "../errors/NotFoundError"
import CartService from "./CartService"

export default class CartProductService {
    private db: PrismaClient
    private cartService: CartService

    constructor(db: PrismaClient, cartService: CartService){
        this.db = db
        this.cartService = cartService
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
        await this.cartService.getCartById(cartId)

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