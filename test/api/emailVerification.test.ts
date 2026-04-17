import request from 'supertest';
import app from './testApp';

describe("Email Verification API", () => {
    let customer_jwt: string, admin_jwt: string;

    test("Login as customer", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "jihadumar1021@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")
        customer_jwt = response.body.data.token

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Jihad Umar")
        expect(response.body.data.user.email).toBe("jihadumar1021@gmail.com")
        expect(response.body.data.user.phone).toBe("082352395596")
        expect(response.body.data.user.address).toBe("Jl. langsat")        
        expect(response.body.data.user.cart).toHaveProperty("id")
    })

    test("Login as admin", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "noreplydevnoreplydev@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")
        admin_jwt = response.body.data.token

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("admin")
        expect(response.body.data.user.name).toBe("Luminous Admin")
        expect(response.body.data.user.email).toBe("noreplydevnoreplydev@gmail.com")
    })

    test("Send email verification with customer", async() => {
        const response = await request(app).post("/api/email-verifications/send-email-verification").set({
            "Authorization": `Bearer ${customer_jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })  
    
    test("Send email verification with admin", async() => {
        const response = await request(app).post("/api/email-verifications/send-email-verification").set({
            "Authorization": `Bearer ${admin_jwt}`
        })

        expect(response.status).toBe(403)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Send email verification without jwt", async() => {
        const response = await request(app).post("/api/email-verifications/send-email-verification")

        expect(response.status).toBe(401)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Verify email with valid token", async() => {
        const email_verification_token = process.env.EMAIL_VERIFICATION_TOKEN
        const response = await request(app).post("/api/email-verifications/verify-email").send({
            token: email_verification_token
        })
        
        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })

    test("Verify email with invalid token", async() => {
        const response = await request(app).post("/api/email-verifications/verify-email").send({
            token: "xxx"
        })

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })
})