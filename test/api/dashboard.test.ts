import request from 'supertest'
import app from './testApp'

describe("Dashboard API", () => {
    let jwt: string

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
        jwt = response.body.data.jwt

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("admin")
        expect(response.body.data.user.name).toBe("Luminous Admin")
        expect(response.body.data.user.email).toBe("noreplydevnoreplydev@gmail.com")
    })

    test("Get dashboard data", async() => {
        const response = await request(app).get("/api/dashboard").set({
            "Authorization": `Bearer ${jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("total_users")
        expect(response.body.data).toHaveProperty("total_products")
        expect(response.body.data).toHaveProperty("total_categories")
        expect(response.body.data).toHaveProperty("products_per_category")
        expect(response.body.data).toHaveProperty("most_added_to_cart_products")
        expect(response.body.data).toHaveProperty("low_stock_products")
    })
})