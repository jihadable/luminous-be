const userMapper = {
    response: (user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email
    })
}

export default userMapper