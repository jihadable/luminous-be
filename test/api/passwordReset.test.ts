import request from "supertest"
import app from "./testApp"

describe("Password reset API", () => {
    test("Send password reset email", async() => {
        const response = await request(app).post("/api/password-reset/send-password-reset-email").send({
            email: "jihadumar1021@gmail.com"
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })

    test("Send password reset with invalid email", async() => {
        const response = await request(app).post("/api/password-reset/send-password-reset-email").send({
            email: "xxx"
        })

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Reset password", async() => {
        const response = await request(app).post("/api/password-reset/reset-password").send({
            token: process.env.PASSWORD_RESET_TOKEN,
            new_password: "secret123"
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })

    test("Reset password with invalid token", async() => {
        const response = await request(app).post("/api/password-reset/reset-password").send({
            token: "xxx",
            new_password: "secret123"
        })

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })
})