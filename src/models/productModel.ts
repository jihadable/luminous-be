type ProductType = {
    id: number,
    name: string,
    price: number,
    img: string,
    texture: string,
    weight: number,
    size: string,
    description: string,
    category: string
}

const Product = {
    async find(){
        
    },

    async findById(id: number){

    },

    response(product: ProductType){
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            texture: product.texture,
            weight: product.weight,
            size: product.size,
            description: product.description,
            category: product.category
        }
    }
}