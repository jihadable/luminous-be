import { Schema, model } from "mongoose"

type productDocument = {
    name: string,
    price: number,
    img: string,
    texture: string,
    weight: number,
    size: string,
    description: string,
    categories: string[],
    stock: {
        type: Number,
        default: 100,
    },
    response: () => object
}

const productSchema: Schema<productDocument> = new Schema(
    {
        name: String,
        price: Number,
        img: String,
        texture: String,
        weight: Number,
        size: String,
        description: String,
        categories: [String],
        stock: Number
    },
    {
        timestamps: true,
        collection: "products"
    }
)

// product response
productSchema.methods.response = function(){
    return {
        id: this._id,
        name: this.name,
        price: this.price,
        img: this.img,
        texture: this.texture,
        weight: this.weight,
        size: this.size,
        description: this.description,
        categories: this.categories
    }
}

const Product = model<productDocument>("Product", productSchema)

export default Product