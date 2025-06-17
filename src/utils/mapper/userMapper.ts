import { Cart, User } from "../../../generated/prisma"

const userMapper = {
    response: (user: User & { cart: Cart | null }) => ({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        cart: {
            id: user.cart?.id
        }
    })
}

export default userMapper