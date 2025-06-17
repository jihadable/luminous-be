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

        this.postCartProduct = this.postCartProduct.bind(this)
        this.getCartProducts = this.getCartProducts.bind(this)
        this.updateCartProduct = this.updateCartProduct.bind(this)
        this.deleteCartProduct = this.deleteCartProduct.bind(this)
    }

    async postCartProduct(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validatePostCartProductPayload(req.body)

            const { cart_id } = req.params
            const { product_id } = validatedReqBody
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

    async updateCartProduct(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateUpdateCartProductPayload(req.body)

            const { cart_id } = req.params
            const { product_id, quantity } = validatedReqBody
            const cartProduct = await this.service.updateCartProduct(cart_id, product_id, { quantity })

            res.status(200).json({
                status: "success",
                data: { cart_product: cartProductMapper.response(cartProduct) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCartProduct(req: Request, res: Response, next: NextFunction){
        try {
            const { cart_id, product_id } = req.params
            await this.service.deleteCartProduct(cart_id, product_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}