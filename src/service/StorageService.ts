import axios from "axios";
import path from "path";
import { v4 as uuid } from "uuid";

export default class StorageService {
    private baseURL: string = process.env.IMAGE_API_ENDPOINT || ""
    private apiKey: string = process.env.IMAGE_API_KEY || ""

    async addImage(image: Express.Multer.File){
        try {
            const imageExt = path.extname(image.originalname)
            const imageName = uuid() + imageExt
    
            await axios.post(`${this.baseURL}/${imageName}`, image.buffer, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": image.mimetype
                }
            })

            return imageName
        } catch(error){
            console.log(error)
            throw new Error("Gambar gagal simpan")
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
            throw new Error("Gambar gagal dihapus")
        }
    }
}