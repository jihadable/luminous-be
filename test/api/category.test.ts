import request from "supertest"
import app from "./testApp"

describe("Category API", () => {
    let jwt: string, category_id: string

    test("Login as admin", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "luminousadmin@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

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

        expect(response.body.data.user.role).toBe("admin")
        expect(response.body.data.user.name).toBe("luminous admin")
        expect(response.body.data.user.email).toBe("luminousadmin@gmail.com")
    })

    test("Create category with valid payload", async() => {
        const response = await request(app).post("/api/categories")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                name: "test category"
            })

        expect(response.status).toBe(201)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("category")

        expect(response.body.data.category).toHaveProperty("id")
        category_id = response.body.data.category.id
        expect(response.body.data.category).toHaveProperty("name")

        expect(response.body.data.category.name).toBe("test category")
    })

    test("Create category with invalid payload", async() => {
        const response = await request(app).post("/api/categories")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({})

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Get categories", async() => {
        const response = await request(app).get("/api/categories")

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("categories")

        expect(Array.isArray(response.body.data.categories)).toBe(true)
        expect(response.body.data.categories[0]).toHaveProperty("id")
        expect(response.body.data.categories[0]).toHaveProperty("name")
    })

    test("Get category with valid id", async() => {
        const response = await request(app).get(`/api/categories/${category_id}`)

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("category")

        expect(response.body.data.category).toHaveProperty("id")
        expect(response.body.data.category).toHaveProperty("name")

        expect(response.body.data.category.name).toBe("test category")
    })

    test("Get category with invalid id", async() => {
        const response = await request(app).get("/api/categories/xxx")

        expect(response.status).toBe(404)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Delete category", async() => {
        const response = await request(app).delete(`/api/categories/${category_id}`).set({
            "Authorization": `Bearer ${jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })
})