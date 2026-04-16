import { Category } from "@prisma/client";

const categoryMapper = {
    response: (category: Category) => ({
        id: category.id,
        name: category.name
    })
}

export default categoryMapper