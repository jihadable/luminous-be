import { Request, Response } from "express"
import Joi from "joi"
import { CartProduct } from "../models/cartProductModel"
import defaultResponse from "../utils/defaultResponse"
import serverErrorResponse from "../utils/serverErrorResponse"

export const getAllCartProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id } = req.body

        const cartProducts = await CartProduct.findByUser(user_id)

        const cartProductsResponse = await Promise.all(
            cartProducts.map(async(cartProduct) => {
                return await CartProduct.response(cartProduct)
            })
        )

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua produk keranjang"),
            cart_products: cartProductsResponse
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

export const storeCartProduct = async(req: Request, res: Response): Promise<Response> => {
    const storeCartProductsSchema = Joi.object({
        user_id: Joi.number().required(),
        product_id: Joi.number().required()
    })

    const { error } = storeCartProductsSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id, product_id } = req.body
        
        const cartProduct = await CartProduct.create(user_id, product_id)

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil membuat produk keranjang baru"),
            cart_product: await CartProduct.response(cartProduct)
        })
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

export const deleteCartProduct = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id } = req.body
        const { product_id } = req.params

        const deletedCartProduct = await CartProduct.delete(user_id, product_id)

        if (!deletedCartProduct){
            return res.status(404).json(defaultResponse(404, false, "Produk keranjang tidak ditemukan"))
        }

        return res.status(200).json(defaultResponse(200, true, "Berhasil menghapus produk dari keranjang"))
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}

export const deleteAllCartProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id } = req.body

        await CartProduct.deleteAll(user_id)

        return res.status(200).json(defaultResponse(200, true, "Berhasil menghapus semua produk dari keranjang"))
    } catch (error) {
        return serverErrorResponse(error, res)
    }
}