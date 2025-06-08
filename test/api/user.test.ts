import request from 'supertest'
import app from './testApp'

describe("User API", () => {
    let JWT: string 

    test("Register with valid payload", async() => {
        const response = await request(app).post("/api/users/register").send({
            name: "Test",
            email: "test@gmail.com",
            password: "abcddcba"
        })

        expect(response.status).toBe(201)
        
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")
        JWT = response.body.data.token

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
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
            "Authorization": `Bearer ${JWT}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
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
                "Authorization": `Bearer ${JWT}`
            })
            .send({
                name: "Update test"
            })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Update test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
    })

    test("Login with valid payload", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "test@gmail.com",
            password: "abcddcba"
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("Update test")
        expect(response.body.data.user.email).toBe("test@gmail.com")        
    })

    test("Login with invalid payload", async() => {
        const response = await request(app).post("/api/users/login").send({})

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })
})
