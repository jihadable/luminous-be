import { sign } from "jsonwebtoken";

export const generateJWT = (id: number) => {
    return sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
}