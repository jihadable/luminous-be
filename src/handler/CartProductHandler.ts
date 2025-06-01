import { NextFunction, Request, Response } from "express";
import CartProductService from "../service/CartProductService";

export default class CartProductHandler {
    private service: CartProductService

    constructor(service: CartProductService){
        this.service = service
    }

    async postCartProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cartId } = req.params
            const { product_id } = req.body

            const cartProduct = await this.service.addCartProduct(cartId, product_id)

            res.status(201).json({
                status: "success",
                data: { cart_product: cartProduct }
            })
        } catch(error){
            next(error)
        }
    }

    async getCartProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cartId } = req.params

            const cartProducts = await this.service.getCartProducts(cartId)

            res.status(200).json({
                status: "success",
                data: { cart_products: cartProducts }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCartProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cartId } = req.params
            const { product_id } = req.body

            await this.service.deleteCartProduct(cartId, product_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}