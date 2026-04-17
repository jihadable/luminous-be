import { PrismaClient } from "@prisma/client"
import BadRequestError from "../errors/BadRequestError.js"
import NotFoundError from "../errors/NotFoundError.js"
import { sendEmailVerification } from "../helper/mailer.js"
import { getToken } from "../helper/tokenizer.js"

class EmailVerificationService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async sendEmailVerification(userId: string){
        const { token, email } = await this.db.$transaction(async(tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId }
            })

            if (!user){
                throw new NotFoundError("User not found")
            }

            if (user?.is_email_verified){
                throw new BadRequestError("Email is already verified")   
            }

            const token = getToken()
            const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
            await tx.emailVerification.create({
                data: {
                    user_id: userId,
                    token,
                    expire_at: expireTime
                }
            })

            return { token, email: user.email }
        })

        const emailVerificationLink = `${process.env.WEB_ENDPOINT}/verify-email/${token}`
        await sendEmailVerification(email, emailVerificationLink)
    }

    async verifyEmail(token: string){
        await this.db.$transaction(async(tx) => {
            const emailVerification = await tx.emailVerification.findFirst({
                where: { token }
            })

            if (!emailVerification){
                throw new BadRequestError("Token is invalid or expired")
            }
            
            if (emailVerification.expire_at < new Date()){
                throw new BadRequestError("Token is invalid or expired")
            }
            
            const user = await tx.user.findUnique({
                where: { id: emailVerification.user_id }
            })
            
            if (!user){
                throw new BadRequestError("Token is invalid or expired")
            }

            await tx.user.update({
                where: { id: user.id },
                data: {
                    is_email_verified: true
                }
            })

            await tx.emailVerification.delete({
                where: { id: emailVerification.id }
            })
        })
    }
}

export default EmailVerificationService