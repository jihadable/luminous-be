import request from 'supertest'
import app from './testApp'

describe("User API", () => {
    let jwt: string

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
        expect(response.body.data).toHaveProperty("token")
        jwt = response.body.data.token

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
    
    test("Get user data with token", async() => {
        const response = await request(app).get("/api/users").set({
            "Authorization": `Bearer ${jwt}`
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

    test("Get user data without token", async() => {
        const response = await request(app).get("/api/users")

        expect(response.status).toBe(401)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Update user data", async() => {
        const response = await request(app).put("/api/users")
            .set({
                "Authorization": `Bearer ${jwt}`
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
        expect(response.body.data).toHaveProperty("token")

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
})
