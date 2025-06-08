import { sign } from "jsonwebtoken";
import { Role } from "../../generated/prisma";

export default function generateJWT(id: string, role: Role){
    return sign({ id, role }, process.env.JWT_SECRET || "", { expiresIn: "30d" })
}