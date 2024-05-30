import { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";

type UserDocument = {
    username: string;
    email: string;
    password: string;
    generateJWT: () => Promise<string>;
}

const userSchema: Schema<UserDocument> = new Schema(
    {
        username: String,
        email: String,
        password: String
    },
    {
        timestamps: true,
        collection: "users"
    }
)

// generate token
userSchema.methods.generateJWT = async function(): Promise<string>{
    return await sign({ id: this._id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
}

const User = model<UserDocument>("User", userSchema)

export default User