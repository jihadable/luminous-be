export default function getProducts(){
    const products = [
        {
            name: "Midback chair",
            price: 300000,
            image_file: "midback-chair.jpg",
            category_name: "furniture",
            description: "Our Midback Chair is designed with ergonomic support and modern aesthetics, making it the perfect addition to your office or home workspace. Its cushioned seat and adjustable features ensure comfort during long hours of use, promoting better posture and productivity.",
            texture: "Plastic",
            weight: "7kg",
            size: "60cm x 50cm"
        },
        {
            name: "La-Z-Sofa",
            price: 250000,
            image_file: "lazy-sofa.jpg",
            category_name: "furniture",
            description: "Experience ultimate relaxation with our La-Z-Sofa. This plush and spacious sofa is crafted for exceptional comfort, making it an inviting centerpiece for your living room. Sink into its luxurious cushions and unwind after a long day, enjoying quality time with family and friends.",
            texture: "Kapok",
            weight: "4kg",
            size: "150cm x 75cm"
        },
        {
            name: "End table",
            price: 150000,
            image_file: "end-table.jpg",
            category_name: "furniture",
            description: "Elevate your living space with our End Table. Crafted from high-quality materials, it adds a touch of sophistication to any room. With its practical design, you can conveniently place your books, remote controls, or decor items, making it both stylish and functional.",
            texture: "Wood",
            weight: "7kg",
            size: "100cm x 100cm"
        },
        {
            name: "Writing desk",
            price: 200000,
            image_file: "writing-desk.jpg",
            category_name: "furniture",
            description: "Boost your productivity with our Writing Desk. Its sleek and sturdy construction provides an organized workspace, while the minimalist design complements various decor styles. Whether for work or creative pursuits, this desk is your perfect companion.",
            texture: "Wood",
            weight: "7kg",
            size: "170cm x 70cm"
        },
        {
            name: "Side table",
            price: 175000,
            image_file: "side-table.jpg",
            category_name: "furniture",
            description: "Our Side Table combines elegance and utility. Its compact size makes it suitable for tight spaces, and the open shelving offers convenient storage for your essentials. Enjoy easy access to your snacks and beverages while enhancing the aesthetics of your room.",
            texture: "Wood",
            weight: "6kg",
            size: "60cm x 60cm"
        },
        {
            name: "Spring Bed",
            price: 500000,
            image_file: "spring-bed.jpg",
            category_name: "bedroom",
            description: "Enjoy a restful sleep on our Spring Bed. Designed with advanced spring technology, it provides optimal support for a comfortable night's rest. Wake up feeling rejuvenated and ready to take on the day with this quality mattress.",
            texture: "Kapok",
            weight: "70kg",
            size: "200cm x 170cm"
        },
        {
            name: "Memory foam",
            price: 495000,
            image_file: "memory-foam.jpg",
            category_name: "bedroom",
            description: "Experience the ultimate in sleep comfort with our Memory Foam mattress. It conforms to your body, relieving pressure points and promoting deep, uninterrupted sleep. Upgrade your sleep quality and overall well-being with this luxurious mattress.",
            texture: "Foam",
            weight: "65kg",
            size: "190cm x 150cm"
        },
        {
            name: "Latex bed",
            price: 475000,
            image_file: "latex-bed.jpg",
            category_name: "bedroom",
            description: "Our Latex Bed offers a natural and eco-friendly sleep solution. With its latex core, it provides exceptional support and breathability, ensuring a comfortable and healthy sleep envBesiment. Invest in your well-being with this durable and sustainable mattress.",
            texture: "Latex",
            weight: "65kg",
            size: "190cm x 150cm"
        },
        {
            name: "Floor fan",
            price: 255000,
            image_file: "floor-fan.jpg",
            description: "Our versatile floor fan is designed to keep your living spaces cool and comfortable. With its adjustable height and multi-speed settings, it's the perfect solution for beating the heat during warm summer days. Its sleek and modern design seamlessly blends with any room decor, making it a stylish and functional addition to your home.",
            category_name: "elektronic",
            texture: "Steel",
            weight: "5kg",
            size: "100cm x 100cm"
        },
        {
            name: "Wall fan",
            price: 265000,
            image_file: "wall-fan.jpg",
            description: "Introducing our wall fan, a space-saving cooling solution for your home. Mount this fan on any wall to maximize airflow while minimizing floor space usage. The oscillating feature ensures even distribution of cool air throughout the room, making it an efficient and unobtrusive addition to your household. Say goodbye to stuffy rooms and hello to comfort with our wall fan.",
            category_name: "elektronic",
            texture: "Steel",
            weight: "6kg",
            size: "100cm x 100cm"
        },
        {
            name: "Neck pillow",
            price: 50000,
            image_file: "neck-pillow.jpg",
            category_name: "furniture",
            description: "Say goodbye to neck discomfort with our Neck Pillow. Whether you're traveling or relaxing at home, its ergonomic design provides essential support. Enjoy pain relief and relaxation whenever you need it.",
            texture: "Kapok",
            weight: "1kg",
            size: "50cm x 50cm"
        },
        {
            name: "Bean bag",
            price: 185000,
            image_file: "bean-bag.jpg",
            category_name: "furniture",
            description: "Dive into relaxation with our Bean Bag. This oversized, ultra-comfortable chair adapts to your body, making it the ideal spot for lounging and unwinding. It's a versatile addition to any living space, creating a cozy corner for leisure and relaxation.",
            texture: "Kapok",
            weight: "2kg",
            size: "150cm x 75cm"
        },
        {
            name: "Soup plate",
            price: 30000,
            image_file: "soup-plate.jpg",
            category_name: "kitchen",
            description: "Our Soup Plate is designed with both style and functionality in mind. Its deep design is perfect for serving hearty soups and stews, while its elegant aesthetic enhances your dining experience.",
            texture: "Steel",
            weight: "0.3kg",
            size: "15cm x 15cm"
        },
        {
            name: "Dessert plate",
            price: 30000,
            image_file: "dessert-plate.jpg",
            category_name: "kitchen",
            description: "Elevate your dessert presentation with our Dessert Plate. Its elegant design complements sweet treats and adds a touch of sophistication to your table setting, making it ideal for special occasions and everyday use.",
            texture: "Steel",
            weight: "0.3kg",
            size: "15cm x 15cm"
        },
        {
            name: "Tea spoon",
            price: 12000,
            image_file: "tea-spoon.jpg",
            category_name: "kitchen",
            description: "Enhance your tea time with our Tea Spoon. Crafted for both beauty and practicality, it adds a touch of elegance to your tea service. Its ergonomic design ensures comfortable stirring and sipping.",
            texture: "Steel",
            weight: "0.1kg",
            size: "10cm x 2cm"
        },
        {
            name: "Salad spoon",
            price: 15000,
            image_file: "salad-spoon.jpg",
            category_name: "kitchen",
            description: "Serve salads with style using our Salad Spoon. Its unique design makes tossing and serving salads effortless, while the quality craftsmanship adds a refined touch to your dining table.",
            texture: "Steel",
            weight: "0.1kg",
            size: "10cm x 2cm"
        },
        {
            name: "Slicing knife",
            price: 90000,
            image_file: "slicing-knife.jpg",
            category_name: "kitchen",
            description: "Our Slicing Knife is a kitchen essential for precise cutting. Its sharp blade effortlessly slices through meats, bread, and more, ensuring uniform slices for a professional culinary experience.",
            texture: "Steel",
            weight: "0.2kg",
            size: "30cm x 5cm"
        },
        {
            name: "Boning knife",
            price: 100000,
            image_file: "boning-knife.jpg",
            category_name: "kitchen",
            description: "Achieve expert precision with our Boning Knife. Designed for delicate tasks like deboning and filleting, it's a must-have for any chef or home cook. The sharp blade and ergonomic handle make food preparation a breeze.",
            texture: "Steel",
            weight: "0.2kg",
            size: "30cm x 5cm"
        },
        {
            name: "Basic microwave",
            price: 425000,
            image_file: "basic-microwave.jpg",
            category_name: "kitchen",
            description: "Simplify your cooking routine with our Basic Microwave. This versatile appliance offers quick and efficient heating for your favorite dishes, snacks, and beverages. Its user-friendly features make it an essential dapur companion.",
            texture: "Steel",
            weight: "5kg",
            size: "90cm x 60cm"
        },
        {
            name: "Grill microwave",
            price: 450000,
            image_file: "grill-microwave.jpg",
            category_name: "kitchen",
            description: "Elevate your cooking options with our Grill Microwave. In addition to standard heating, it features a grilling function, allowing you to create delicious, crispy dishes. It's perfect for preparing a wide range of meals with ease.",
            texture: "Steel",
            weight: "5kg",
            size: "90cm x 60cm"
        },
        {
            name: "Hand blender",
            price: 215000,
            image_file: "hand-blender.jpg",
            category_name: "kitchen",
            description: "Our Hand Blender is a versatile dapur tool for blending, chopping, and pureeing. Its ergonomic design and powerful motor make food preparation quick and convenient, simplifying your cooking tasks.",
            texture: "Steel",
            weight: "2kg",
            size: "80cm x 20cm"
        },
        {
            name: "Full size blender",
            price: 200000,
            image_file: "full-size-blender.jpg",
            category_name: "kitchen",
            description: "Experience the ultimate blending performance with our Full Size Blender. Whether you're making smoothies, soups, or sauces, this appliance's robust motor and multiple speed settings ensure flawless results every time. Make healthy and delicious creations effortlessly with this kitchen essential.",
            texture: "Steel",
            weight: "3kg",
            size: "80cm x 30cm"
        }
    ]
}