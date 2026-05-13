import { PrismaClient } from "@prisma/client";
import { compareSync, hash } from "bcrypt";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { sendResetPasswordEmail } from "../helper/mailer.js";
import { getToken } from "../helper/tokenizer.js";

class PasswordResetService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async sendResetPasswordEmail(email: string){
        const { token } = await this.db.$transaction(async(tx) => {
            const user = await tx.user.findUnique({
                where: { email }
            })
    
            if (!user){
                throw new NotFoundError("User not found")
            }
    
            const token = getToken()
            const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
            await tx.passwordReset.create({
                data: {
                    user_id: user.id,
                    token,
                    expire_at: expireTime
                }
            })

            return { token }
        })

        const emailVerificationLink = `${process.env.WEB_ENDPOINT}/reset-password/${token}`
        await sendResetPasswordEmail(email, emailVerificationLink)
    }

    async resetPassword(token: string, newPassword: string){
        await this.db.$transaction(async(tx) => {
            const passwordReset = await tx.passwordReset.findFirst({
                where: { token }
            })

            if (!passwordReset){
                throw new BadRequestError("Token is invalid or expired")
            }

            if (passwordReset.expire_at < new Date()){
                await tx.passwordReset.delete({
                    where: {
                        id: passwordReset.id
                    }
                })

                throw new BadRequestError("Token is invalid or expired")
            }

            const user = await tx.user.findUnique({
                where: { id: passwordReset.user_id }
            })

            if (!user){
                throw new BadRequestError("Token is invalid or expired")
            }

            if (compareSync(newPassword, user.password)){
                throw new BadRequestError("New password can not be same with old password")
            }

            const hashedNewPassword = await hash(newPassword, 10)
            await tx.user.update({
                where: { id: user.id },
                data: { password: hashedNewPassword }
            })

            await tx.passwordReset.deleteMany({
                where: { user_id: user.id }
            })
        })
    }
}

export default PasswordResetService