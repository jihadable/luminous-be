import { PrismaClient } from '../../generated/prisma'

let prisma: PrismaClient

declare global {
   var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
   prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default function DB(): PrismaClient {
    return prisma
}