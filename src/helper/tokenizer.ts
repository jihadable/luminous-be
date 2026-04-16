import { Role } from "@prisma/client";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";

const getToken = () => {
    return randomBytes(32).toString("hex")
}

const getJWT = (id: string, role: Role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "", { expiresIn: "30d" })
}

export { getJWT, getToken };

