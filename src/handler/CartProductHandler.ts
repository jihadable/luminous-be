import { NextFunction, Request, Response } from "express";
import CartProductService from "../service/CartProductService";
import cartProductMapper from "../utils/mapper/cartProductMapper";
import { CartProductValidator } from "../validator/cartProductValidator";

export default class CartProductHandler {
    private service: CartProductService
    private validator: CartProductValidator

    constructor(service: CartProductService, validator: CartProductValidator){
        this.service = service
        this.validator = validator
    }

    async postCartProduct(req: Request, res: Response, next: NextFunction){
        try {
            this.validator.validatePostCartProductPayload(req.body)

            const { cartId } = req.params
            const { product_id } = req.body
            const cartProduct = await this.service.addCartProduct(cartId, product_id)

            res.status(201).json({
                status: "success",
                data: { cart_product: cartProductMapper.response(cartProduct) }
            })
        } catch(error){
            next(error)
        }
    }

    async getCartProducts(req: Request, res: Response, next: NextFunction){
        try {
            const { cartId } = req.params
            const cartProducts = await this.service.getCartProducts(cartId)

            res.status(200).json({
                status: "success",
                data: { cart_products: cartProducts.map(cartProduct => cartProductMapper.response(cartProduct)) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCartProduct(req: Request, res: Response, next: NextFunction){
        try {
            this.validator.validateDeleteCartProductPayload(req.body)

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