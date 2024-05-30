import { Request, Response } from "express";
import Product from "../models/productModel";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

export const getAllProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        const products = await Product.find()

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all products successfully"),
            products: products.map(product => product.response())
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}