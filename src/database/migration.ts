import { seeder } from "./seeder"
import { createCartProductsTable } from "./tables/createCartProductsTable"
import { createProductsTable } from "./tables/createProductsTable"
import { createUsersTable } from "./tables/createUsersTable"

const migration = async() => {
    await Promise.all([
        createUsersTable(),
        createProductsTable(),
        createCartProductsTable()
    ])

    await seeder()
}

migration()
    .then(() => {
        console.log("Migration completed successfully.")
    })
    .catch((err) => {
        console.error("Migration failed\n", err)
    })