import axios from "axios";
import path from "path";
import { v4 as uuid } from "uuid";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { DefaultArgs } from "../../generated/prisma/runtime/library";

export default class StorageService {
    private db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    private baseURL: string = process.env.IMAGE_API_ENDPOINT || ""
    private apiKey: string = process.env.IMAGE_API_KEY || ""

    constructor(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>){
        this.db = db
    }

    async addImage(image: Express.Multer.File){
        try {
            const imageExt = path.extname(image.originalname)
            const imageName = uuid() + imageExt
    
            await axios.post(`${this.baseURL}/${imageName}`, image.buffer, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`
                }
            })

            return imageName
        } catch(error){
            console.log(error)
            return ""
        }
    }

    async updateImage(imageURL: string, file: Express.Multer.File){
        try {  
            await axios.put(`${this.baseURL}/${imageURL}`, file.buffer, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`
                }
            })
        } catch(error){
            console.log(error)
        }
    }

    async deleteImage(imageURL: string){
        try {
            await axios.delete(`${this.baseURL}/${imageURL}`, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`
                }
            })
        } catch(error){
            console.log(error)
        }
    }
}