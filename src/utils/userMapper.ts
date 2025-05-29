const userMapper = {
    response: (user: User) => ({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
    })
}

export default userMapper