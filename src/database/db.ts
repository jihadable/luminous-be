import { PrismaClient } from "../../generated/prisma"

export default function DB(){
    const prisma = new PrismaClient()    

    return prisma
}