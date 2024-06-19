import { Schema, model } from "mongoose"

type productDocument = {
    name: string,
    price: number,
    img: string,
    texture: string,
    weight: number,
    size: string,
    description: string,
    category: string[],
    stock: number,
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
        category: [String],
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
        category: this.category,
        // stock: this.stock
    }
}

const Product = model<productDocument>("Product", productSchema)

export default Product