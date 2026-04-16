import fs from "fs"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
})

const sendEmailVerification = async (target: string, emailVerificationLink: string) => {
    const html = fs
        .readFileSync(
            new URL("../view/emailVerification.html", import.meta.url),
            "utf-8"
        )
        .replace("{{emailVerificationLink}}", emailVerificationLink)

    await transporter.sendMail({
        to: target,
        subject: "[Luminous] Email Verification",
        html
    })
}

export { sendEmailVerification }
