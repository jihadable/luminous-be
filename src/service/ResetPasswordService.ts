import { PrismaClient } from "@prisma/client";

class ResetPasswordService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async sendResetPasswordEmail(email: string){

    }

    async resetPassword(token: string, newPassword: string){

    }

}

export default ResetPasswordService