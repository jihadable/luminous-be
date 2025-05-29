type User = {
    id: string,
    name: string,
    role: "user" | "admin",
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date
}