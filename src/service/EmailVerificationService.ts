import { PrismaClient } from "@prisma/client"

class EmailVerificationService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async sendEmailVerification(userId: string){
        
    }

    async verifyEmail(token: string){

    }
}

export default EmailVerificationService