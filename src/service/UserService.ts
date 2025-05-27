import { compareSync, hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { DefaultArgs } from "../../generated/prisma/runtime/library";
import BadRequestError from "../errors/BadRequestError";
import userMapper from "../utils/userMapper";

export default class UserService {
    private db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

    constructor(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>){
        this.db = db
    }

    async addUser({ name, email, password }: { name: string, email: string, password: string }){
        const id = uuid()
        const hashedPassword = await hash(password, 10)
        const user = await this.db.user.create({
            data: { id, name, email, password: hashedPassword }
        })

        return userMapper.response(user)
    }

    async updateUser(id: string, { name }: { name: string }){
        const user = await this.db.user.update({
            where: { id },
            data: { name }
        })

        return userMapper.response(user)
    }

    async verifyUser(email: string, password: string){
        const user = await this.db.user.findUnique({
            where: { email }
        })

        if (!user){
            throw new BadRequestError("Email atau password salah")
        }

        if (!compareSync(password, user.password)){
            throw new BadRequestError("Email atau password salah")
        }

        return userMapper.response(user)
    }
}

