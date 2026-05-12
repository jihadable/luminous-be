import request from 'supertest'
import app from './testApp'

describe("User API", () => {
    let customer_jwt: string, admin_jwt: string

    test("Register with valid payload", async() => {
        const response = await request(app).post("/api/users/register").send({
            name: "Test",
            email: "test@gmail.com",
            password: process.env.PRIVATE_PASSWORD,
            phone: "081234567890",
            address: "Jl. Rambutan"
        })

        expect(response.status).toBe(201)
        
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("jwt")
        customer_jwt = response.body.data.jwt

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081234567890")
        expect(response.body.data.user.address).toBe("Jl. Rambutan")
        expect(response.body.data.user.cart).toHaveProperty("id")
    })

    test("Register with invalid payload", async() => {
        const response = await request(app).post("/api/users/register").send({})

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })
    
    test("Get user data with jwt", async() => {
        const response = await request(app).get("/api/users/auth").set({
            "Authorization": `Bearer ${customer_jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081234567890")
        expect(response.body.data.user.address).toBe("Jl. Rambutan")
        expect(response.body.data.user.cart).toHaveProperty("id")
    })

    test("Get user data without jwt", async() => {
        const response = await request(app).get("/api/users/auth")

        expect(response.status).toBe(401)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Update user data", async() => {
        const response = await request(app).put("/api/users")
            .set({
                "Authorization": `Bearer ${customer_jwt}`
            })
            .send({
                name: "Update test",
                phone: "081122334455",
                address: "Jl. Durian"
            })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Update test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081122334455")
        expect(response.body.data.user.address).toBe("Jl. Durian")
        expect(response.body.data.user.cart).toHaveProperty("id")
    })

    test("Login with valid payload", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "test@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("jwt")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Update test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081122334455")
        expect(response.body.data.user.address).toBe("Jl. Durian")        
        expect(response.body.data.user.cart).toHaveProperty("id")        
    })

    test("Login with invalid payload", async() => {
        const response = await request(app).post("/api/users/login").send({})

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Login as admin", async() => {
         const response = await request(app).post("/api/users/login").send({
            email: "noreplydevnoreplydev@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("jwt")
        admin_jwt = response.body.data.jwt

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("admin")
        expect(response.body.data.user.name).toBe("Luminous Admin")
        expect(response.body.data.user.email).toBe("noreplydevnoreplydev@gmail.com")
    })

    test("Get users", async() => {
        const response = await request(app).get("/api/users").set({
            "Authorization": `Bearer ${admin_jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("users")

        expect(Array.isArray(response.body.data.users)).toBe(true)
        expect(response.body.data.users[0]).toHaveProperty("id")
        expect(response.body.data.users[0]).toHaveProperty("role")
        expect(response.body.data.users[0]).toHaveProperty("name")
        expect(response.body.data.users[0]).toHaveProperty("email")
        expect(response.body.data.users[0]).toHaveProperty("phone")
        expect(response.body.data.users[0]).toHaveProperty("address")
        expect(response.body.data.users[0]).toHaveProperty("is_email_verified")
    })
})
