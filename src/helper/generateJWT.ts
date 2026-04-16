import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

const generateJWT = (id: string, role: Role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "", { expiresIn: "30d" })
}

export default generateJWT