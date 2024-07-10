import { seeder } from "./seeder"
import { createProductsTable } from "./tables/createProductsTable"
import { createUsersTable } from "./tables/createUsersTable"

const migration = async() => {
    await createUsersTable()
    await createProductsTable()

    await seeder()
}

migration()
    .then(() => {
        console.log("Migration completed successfully.")
    })
    .catch((err) => {
        console.error("Migration failed\n", err)
    })