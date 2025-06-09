import { Category } from "../../../generated/prisma";

const categoryMapper = {
    response: (category: Category) => ({
        id: category.id,
        name: category.name
    })
}

export default categoryMapper