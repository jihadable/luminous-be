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

            const { cart_id } = req.params
            const { product_id } = req.body
            const cartProduct = await this.service.addCartProduct(cart_id, product_id)

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
            const { cart_id } = req.params
            const cartProducts = await this.service.getCartProducts(cart_id)

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

            const { cart_id } = req.params
            const { product_id } = req.body
            await this.service.deleteCartProduct(cart_id, product_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}