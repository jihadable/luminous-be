import { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";

type UserDocument = {
    fullname: string,
    email: string,
    password: string,
    no_hp: number,
    address: string,
    generateJWT: () => Promise<string>,
    response: () => object
}

const userSchema: Schema<UserDocument> = new Schema(
    {
        fullname: String,
        email: String,
        password: String,
        no_hp: {
            type: Number,
            default: null
        },
        address: {
            type: String,
            default: null
        }
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

// user response
userSchema.methods.response = function(){
    return {
        fullname: this.fullname,
        email: this.email,
        no_hp: this.no_hp,
        address: this.address
    }
}

const User = model<UserDocument>("User", userSchema)

export default User