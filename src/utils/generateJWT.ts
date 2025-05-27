import { sign } from "jsonwebtoken";

export default function generateJWT(id: string){
    return sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" })
}