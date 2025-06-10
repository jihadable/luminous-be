import { Cart, User } from "../../../generated/prisma"

const userMapper = {
    response: (user: User & { cart: Cart | null }) => ({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        cart: {
            id: user.cart?.id
        }
    })
}

export default userMapper