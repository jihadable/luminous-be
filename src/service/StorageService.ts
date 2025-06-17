import { createClient } from "@supabase/supabase-js";
import path from "path";
import { v4 as uuid } from "uuid";

export default class StorageService {
    private baseURL: string = process.env.SUPABASE_API_ENDPOINT || ""
    private apiKey: string = process.env.SUPABASE_API_KEY || ""
    private bucket: string = process.env.SUPABASE_BUCKET || ""
    private supabase = createClient(this.baseURL, this.apiKey)

    async addImage(image: Express.Multer.File){
        try {
            const imageExt = path.extname(image.originalname)
            const imageName = uuid() + imageExt
    
            const { data } = await this.supabase.storage.from(this.bucket).upload(imageName, image.buffer, {
                contentType: image.mimetype,
                upsert: true
            })

            return data?.path || ""
        } catch(error){
            console.log(error)
            throw new Error("Gambar gagal simpan")
        }
    }

    async deleteImage(imageURL: string){
        try {
            await this.supabase.storage.from(this.bucket).remove([imageURL])
        } catch(error){
            console.log(error)
            throw new Error("Gambar gagal dihapus")
        }
    }

    async emptyStorage(){
        try {
            await this.supabase.storage.emptyBucket(this.bucket)
        } catch(error){
            console.log(error)
            throw new Error("Gambar gagal dihapus")
        }
    }
}