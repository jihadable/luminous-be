import { Request, Response } from "express";
import Product from "../models/productModel";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

// get all products
export const getAllProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        const products = await Product.find()

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all products successfully"),
            products: products.map(product => product.response())
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// get single product
export const getSingleProduct = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product){
            return res.status(400).json(defaultResponse(400, false, "Invalid ID"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Get single product successfully"),
            product
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

export const restoreProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
        
        const products = [
            {
                name: "Kursi Sandaran Tengah",
                price: 300000,
                img: "kursi-sandaran-tengah.jpg",
                categories: ["furniture"],
                explanation: "Our Midback Chair is designed with ergonomic support and modern aesthetics, making it the perfect addition to your office or home workspace. Its cushioned seat and adjustable features ensure comfort during long hours of use, promoting better posture and productivity.",
                texture: "Plastik",
                weight: 7,
                size: "60cm x 50cm"
            },
            {
                name: "La-Z-Sofa",
                price: 250000,
                img: "lazy-sofa.jpg",
                categories: ["furniture"],
                explanation: "Experience ultimate relaxation with our La-Z-Sofa. This plush and spacious sofa is crafted for exceptional comfort, making it an inviting centerpiece for your living room. Sink into its luxurious cushions and unwind after a long day, enjoying quality time with family and friends.",
                texture: "Kapuk",
                weight: 4,
                size: "150cm x 75cm"
            },
            {
                name: "Meja Ujung",
                price: 150000,
                img: "meja-ujung.jpg",
                categories: ["furniture"],
                explanation: "Elevate your living space with our End Table. Crafted from high-quality materials, it adds a touch of sophistication to any room. With its practical design, you can conveniently place your books, remote controls, or decor items, making it both stylish and functional.",
                texture: "Kayu",
                weight: 7,
                size: "100cm x 100cm"
            },
            {
                name: "Meja Tulis",
                price: 200000,
                img: "meja-tulis.jpg",
                categories: ["furniture"],
                explanation: "Boost your productivity with our Writing Desk. Its sleek and sturdy construction provides an organized workspace, while the minimalist design complements various decor styles. Whether for work or creative pursuits, this desk is your perfect companion.",
                texture: "Kayu",
                weight: 7,
                size: "170cm x 70cm"
            },
            {
                name: "Meja Samping",
                price: 175000,
                img: "meja-samping.jpg",
                categories: ["furniture"],
                explanation: "Our Side Table combines elegance and utility. Its compact size makes it suitable for tight spaces, and the open shelving offers convenient storage for your essentials. Enjoy easy access to your snacks and beverages while enhancing the aesthetics of your room.",
                texture: "Kayu",
                weight: 6,
                size: "60cm x 60cm"
            },
            {
                name: "Spring Bed",
                price: 500000,
                img: "spring-bed.jpg",
                categories: ["kamar tidur"],
                explanation: "Enjoy a restful sleep on our Spring Bed. Designed with advanced spring technology, it provides optimal support for a comfortable night's rest. Wake up feeling rejuvenated and ready to take on the day with this quality mattress.",
                texture: "Kapuk",
                weight: 70,
                size: "200cm x 170cm"
            },
            {
                name: "Kasur Busa",
                price: 495000,
                img: "kasur-busa.jpg",
                categories: ["kamar tidur"],
                explanation: "Experience the ultimate in sleep comfort with our Memory Foam mattress. It conforms to your body, relieving pressure points and promoting deep, uninterrupted sleep. Upgrade your sleep quality and overall well-being with this luxurious mattress.",
                texture: "Foam",
                weight: 65,
                size: "190cm x 150cm"
            },
            {
                name: "Kasur Latex",
                price: 475000,
                img: "kasur-latex.jpg",
                categories: ["kamar tidur"],
                explanation: "Our Latex Bed offers a natural and eco-friendly sleep solution. With its latex core, it provides exceptional support and breathability, ensuring a comfortable and healthy sleep envBesiment. Invest in your well-being with this durable and sustainable mattress.",
                texture: "Latex",
                weight: 65,
                size: "190cm x 150cm"
            },
            {
                name: "Kipas Angin Lantai",
                price: 255000,
                img: "kipas-angin-lantai.jpg",
                explanation: "Our versatile floor fan is designed to keep your living spaces cool and comfortable. With its adjustable height and multi-speed settings, it's the perfect solution for beating the heat during warm summer days. Its sleek and modern design seamlessly blends with any room decor, making it a stylish and functional addition to your home.",
                categories: ["elektronik"],
                texture: "Besi",
                weight: 5,
                size: "100cm x 100cm"
            },
            {
                name: "Kipas Angin Dinding",
                price: 265000,
                img: "kipas-angin-dinding.jpg",
                explanation: "Introducing our wall fan, a space-saving cooling solution for your home. Mount this fan on any wall to maximize airflow while minimizing floor space usage. The oscillating feature ensures even distribution of cool air throughout the room, making it an efficient and unobtrusive addition to your household. Say goodbye to stuffy rooms and hello to comfort with our wall fan.",
                categories: ["elektronik"],
                texture: "Besi",
                weight: 6,
                size: "100cm x 100cm"
            },
            {
                name: "Bantal Leher",
                price: 50000,
                img: "bantal-leher.jpg",
                categories: [],
                explanation: "Say goodbye to neck discomfort with our Neck Pillow. Whether you're traveling or relaxing at home, its ergonomic design provides essential support. Enjoy pain relief and relaxation whenever you need it.",
                texture: "Kapuk",
                weight: 1,
                size: "50cm x 50cm"
            },
            {
                name: "Kursi Malas",
                price: 185000,
                img: "kursi-malas.jpg",
                categories: ["furniture"],
                explanation: "Dive into relaxation with our Bean Bag. This oversized, ultra-comfortable chair adapts to your body, making it the ideal spot for lounging and unwinding. It's a versatile addition to any living space, creating a cozy corner for leisure and relaxation.",
                texture: "Kapuk",
                weight: 2,
                size: "150cm x 75cm"
            },
            {
                name: "Piring Sup",
                price: 30000,
                img: "piring-sup.jpg",
                categories: ["dapur"],
                explanation: "Our Soup Plate is designed with both style and functionality in mind. Its deep design is perfect for serving hearty soups and stews, while its elegant aesthetic enhances your dining experience.",
                texture: "Logam",
                weight: 0.3,
                size: "15cm x 15cm"
            },
            {
                name: "Piring Pencuci Mulut",
                price: 30000,
                img: "piring-pencuci-mulut",
                categories: ["dapur"],
                explanation: "Elevate your dessert presentation with our Dessert Plate. Its elegant design complements sweet treats and adds a touch of sophistication to your table setting, making it ideal for special occasions and everyday use.",
                texture: "Logam",
                weight: 0.3,
                size: "15cm x 15cm"
            },
            {
                name: "Sendok Teh",
                price: 12000,
                img: "sendok-teh.jpg",
                categories: ["dapur"],
                explanation: "Enhance your tea time with our Tea Spoon. Crafted for both beauty and practicality, it adds a touch of elegance to your tea service. Its ergonomic design ensures comfortable stirring and sipping.",
                texture: "Logam",
                weight: 0.1,
                size: "10cm x 2cm"
            },
            {
                name: "Sendok Salad",
                price: 15000,
                img: "sendok-salad.jpg",
                categories: ["dapur"],
                explanation: "Serve salads with style using our Salad Spoon. Its unique design makes tossing and serving salads effortless, while the quality craftsmanship adds a refined touch to your dining table.",
                texture: "Logam",
                weight: 0.1,
                size: "10cm x 2cm"
            },
            {
                name: "Pisau Iris",
                price: 90000,
                img: "pisau-iris.jpg",
                categories: ["dapur"],
                explanation: "Our Slicing Knife is a dapur essential for precise cutting. Its sharp blade effortlessly slices through meats, bread, and more, ensuring uniform slices for a professional culinary experience.",
                texture: "Logam",
                weight: 0.2,
                size: "30cm x 5cm"
            },
            {
                name: "Pisau Tulang",
                price: 100000,
                img: "pisau-tulang.jpg",
                categories: ["dapur"],
                explanation: "Achieve expert precision with our Boning Knife. Designed for delicate tasks like deboning and filleting, it's a must-have for any chef or home cook. The sharp blade and ergonomic handle make food preparation a breeze.",
                texture: "Logam",
                weight: 0.2,
                size: "30cm x 5cm"
            },
            {
                name: "Microwave Biasa",
                price: 425000,
                img: "microwave-biasa.jpg",
                categories: ["dapur"],
                explanation: "Simplify your cooking routine with our Basic Microwave. This versatile appliance offers quick and efficient heating for your favorite dishes, snacks, and beverages. Its user-friendly features make it an essential dapur companion.",
                texture: "Logam",
                weight: 5,
                size: "90cm x 60cm"
            },
            {
                name: "Microwave Panggang",
                price: 450000,
                img: "microwave-panggang.jpg",
                categories: ["dapur"],
                explanation: "Elevate your cooking options with our Grill Microwave. In addition to standard heating, it features a grilling function, allowing you to create delicious, crispy dishes. It's perfect for preparing a wide range of meals with ease.",
                texture: "Logam",
                weight: 5,
                size: "90cm x 60cm"
            },
            {
                name: "Blender Genggam",
                price: 215000,
                img: "blender-genggam.jpg",
                categories: ["dapur"],
                explanation: "Our Hand Blender is a versatile dapur tool for blending, chopping, and pureeing. Its ergonomic design and powerful motor make food preparation quick and convenient, simplifying your cooking tasks.",
                texture: "Logam",
                weight: 2,
                size: "80cm x 20cm"
            },
            {
                name: "Blender Multifungsi",
                price: 200000,
                img: "blender-multifungsi.jpg",
                categories: ["dapur"],
                explanation: "Experience the ultimate blending performance with our Full Size Blender. Whether you're making smoothies, soups, or sauces, this appliance's robust motor and multiple speed settings ensure flawless results every time. Make healthy and delicious creations effortlessly with this kitchen essential.",
                texture: "Logam",
                weight: 3,
                size: "80cm x 30cm"
            }
        ]

        await Product.deleteMany()

        await Product.insertMany(products)

        return res.status(201).json(defaultResponse(201, true, "Restored products successfully"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}