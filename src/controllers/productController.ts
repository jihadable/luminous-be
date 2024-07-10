import { Request, Response } from "express";
import { Product } from "../models/productModel";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

// get all products
export const getAllProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        const products = await Product.findAll()

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua produk"),
            products: products.map(product => Product.response({...product, price: parseFloat(product.price), weight: parseFloat(product.weight), }))
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}