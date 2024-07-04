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
                description: "Kursi Sandaran Tengah kami dirancang dengan dukungan ergonomis dan estetika modern, menjadikannya tambahan yang sempurna untuk ruang kerja kantor atau rumah Anda. Dengan tempat duduk yang empuk dan fitur yang dapat disesuaikan, kursi ini memastikan kenyamanan selama berjam-jam, mendorong postur yang lebih baik dan produktivitas.",
                texture: "Plastik",
                weight: 7,
                size: "60cm x 50cm"
            },
            {
                name: "La-Z-Sofa",
                price: 250000,
                img: "lazy-sofa.jpg",
                categories: ["furniture"],
                description: "Nikmati relaksasi sempurna dengan La-Z-Sofa kami. Sofa yang luas dan empuk ini dirancang untuk kenyamanan luar biasa, menjadikannya pusat perhatian di ruang tamu Anda. Tenggelamkan diri dalam bantal-bantal mewahnya dan bersantai setelah hari yang panjang, menikmati waktu berkualitas bersama keluarga dan teman.",
                texture: "Kapuk",
                weight: 4,
                size: "150cm x 75cm"
            },
            {
                name: "Meja Ujung",
                price: 150000,
                img: "meja-ujung.jpg",
                categories: ["furniture"],
                description: "Tingkatkan ruang tamu Anda dengan Meja Ujung kami. Dibuat dari bahan berkualitas tinggi, meja ini menambahkan sentuhan keanggunan ke setiap ruangan. Dengan desain praktis, Anda dapat dengan mudah meletakkan buku, remote control, atau barang dekoratif, menjadikannya bergaya dan fungsional.",
                texture: "Kayu",
                weight: 7,
                size: "100cm x 100cm"
            },
            {
                name: "Meja Tulis",
                price: 200000,
                img: "meja-tulis.jpg",
                categories: ["furniture"],
                description: "Tingkatkan produktivitas Anda dengan Meja Tulis kami. Dengan konstruksi yang ramping dan kokoh, meja ini menyediakan ruang kerja yang terorganisir, sementara desain minimalis melengkapi berbagai gaya dekorasi. Baik untuk bekerja atau mengejar kegiatan kreatif, meja ini adalah teman sempurna Anda.",
                texture: "Kayu",
                weight: 7,
                size: "170cm x 70cm"
            },
            {
                name: "Meja Samping",
                price: 175000,
                img: "meja-samping.jpg",
                categories: ["furniture"],
                description: "Meja Samping kami menggabungkan keanggunan dan kegunaan. Ukurannya yang kompak membuatnya cocok untuk ruang yang sempit, dan rak terbukanya menawarkan penyimpanan yang nyaman untuk barang-barang penting Anda. Nikmati akses mudah ke camilan dan minuman sambil meningkatkan estetika ruangan Anda.",
                texture: "Kayu",
                weight: 6,
                size: "60cm x 60cm"
            },
            {
                name: "Spring Bed",
                price: 500000,
                img: "spring-bed.jpg",
                categories: ["kamar tidur"],
                description: "Nikmati tidur yang nyenyak di atas Spring Bed kami. Didesain dengan teknologi pegas canggih, kasur ini memberikan dukungan optimal untuk istirahat malam yang nyaman. Bangun dengan perasaan segar dan siap menghadapi hari dengan kasur berkualitas ini.",
                texture: "Kapuk",
                weight: 70,
                size: "200cm x 170cm"
            },
            {
                name: "Kasur Busa",
                price: 495000,
                img: "kasur-busa.jpg",
                categories: ["kamar tidur"],
                description: "Rasakan kenyamanan tidur yang sempurna dengan kasur Memory Foam kami. Kasur ini menyesuaikan dengan tubuh Anda, meredakan titik tekanan dan mendorong tidur yang dalam dan tanpa gangguan. Tingkatkan kualitas tidur dan kesejahteraan Anda dengan kasur mewah ini.",
                texture: "Foam",
                weight: 65,
                size: "190cm x 150cm"
            },
            {
                name: "Kasur Latex",
                price: 475000,
                img: "kasur-latex.jpg",
                categories: ["kamar tidur"],
                description: "Kasur Latex kami menawarkan solusi tidur yang alami dan ramah lingkungan. Dengan inti lateksnya, kasur ini memberikan dukungan dan sirkulasi udara yang luar biasa, memastikan tidur yang nyaman dan sehat. Investasikan dalam kesejahteraan Anda dengan kasur yang tahan lama dan berkelanjutan ini.",
                texture: "Latex",
                weight: 65,
                size: "190cm x 150cm"
            },
            {
                name: "Kipas Angin Lantai",
                price: 255000,
                img: "kipas-angin-lantai.jpg",
                description: "Kipas lantai serbaguna kami dirancang untuk menjaga ruang hidup Anda tetap sejuk dan nyaman. Dengan tinggi yang dapat disesuaikan dan pengaturan kecepatan yang beragam, kipas ini adalah solusi sempurna untuk mengatasi panas selama hari-hari musim panas. Desainnya yang ramping dan modern menyatu dengan dekorasi ruangan mana pun, menjadikannya tambahan yang stylish dan fungsional untuk rumah Anda.",
                categories: ["elektronik"],
                texture: "Besi",
                weight: 5,
                size: "100cm x 100cm"
            },
            {
                name: "Kipas Angin Dinding",
                price: 265000,
                img: "kipas-angin-dinding.jpg",
                description: "Perkenalkan kipas dinding kami, solusi pendingin yang menghemat ruang untuk rumah Anda. Pasang kipas ini di dinding mana pun untuk memaksimalkan aliran udara sambil meminimalkan penggunaan ruang lantai. Fitur osilasinya memastikan distribusi udara sejuk yang merata di seluruh ruangan, menjadikannya tambahan yang efisien dan tidak mencolok untuk rumah tangga Anda. Ucapkan selamat tinggal pada ruangan yang pengap dan sambut kenyamanan dengan kipas dinding kami.",
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
                description: "Ucapkan selamat tinggal pada ketidaknyamanan leher dengan Bantal Leher kami. Baik saat bepergian atau bersantai di rumah, desain ergonomisnya memberikan dukungan penting. Nikmati pereda nyeri dan relaksasi kapan pun Anda membutuhkannya.",
                texture: "Kapuk",
                weight: 1,
                size: "50cm x 50cm"
            },
            {
                name: "Kursi Malas",
                price: 185000,
                img: "kursi-malas.jpg",
                categories: ["furniture"],
                description: "Nikmati relaksasi dengan Kursi Malas kami. Kursi besar dan sangat nyaman ini menyesuaikan dengan tubuh Anda, menjadikannya tempat yang ideal untuk bersantai dan bersantai. Ini adalah tambahan serbaguna untuk setiap ruang tamu, menciptakan sudut nyaman untuk bersantai.",
                texture: "Kapuk",
                weight: 2,
                size: "150cm x 75cm"
            },
            {
                name: "Piring Sup",
                price: 30000,
                img: "piring-sup.jpg",
                categories: ["dapur"],
                description: "Piring Sup kami dirancang dengan gaya dan fungsionalitas dalam pikiran. Desainnya yang dalam sempurna untuk menyajikan sup dan semur yang lezat, sementara estetika elegannya meningkatkan pengalaman bersantap Anda.",
                texture: "Logam",
                weight: 0.3,
                size: "15cm x 15cm"
            },
            {
                name: "Piring Pencuci Mulut",
                price: 30000,
                img: "piring-pencuci-mulut",
                categories: ["dapur"],
                description: "Tingkatkan presentasi makanan penutup Anda dengan Piring Pencuci Mulut kami. Desain elegannya melengkapi hidangan manis dan menambahkan sentuhan keanggunan ke meja Anda, menjadikannya ideal untuk acara khusus dan penggunaan sehari-hari.",
                texture: "Logam",
                weight: 0.3,
                size: "15cm x 15cm"
            },
            {
                name: "Sendok Teh",
                price: 12000,
                img: "sendok-teh.jpg",
                categories: ["dapur"],
                description: "Tingkatkan waktu minum teh Anda dengan Sendok Teh kami. Dirancang untuk kecantikan dan praktikalitas, sendok ini menambahkan sentuhan keanggunan pada layanan teh Anda. Desain ergonomisnya memastikan pengadukan dan menyesap yang nyaman.",
                texture: "Logam",
                weight: 0.1,
                size: "10cm x 2cm"
            },
            {
                name: "Sendok Salad",
                price: 15000,
                img: "sendok-salad.jpg",
                categories: ["dapur"],
                description: "Sajikan salad dengan gaya menggunakan Sendok Salad kami. Desain uniknya membuat mengaduk dan menyajikan salad menjadi mudah, sementara pengerjaan berkualitas menambahkan sentuhan halus pada meja makan Anda.",
                texture: "Logam",
                weight: 0.1,
                size: "10cm x 2cm"
            },
            {
                name: "Pisau Iris",
                price: 90000,
                img: "pisau-iris.jpg",
                categories: ["dapur"],
                description: "Pisau Iris kami adalah keperluan dapur untuk pemotongan yang presisi. Pisau tajamnya dengan mudah memotong daging, roti, dan lainnya, memastikan potongan yang seragam untuk pengalaman kuliner profesional.",
                texture: "Logam",
                weight: 0.2,
                size: "30cm x 5cm"
            },
            {
                name: "Pisau Tulang",
                price: 100000,
                img: "pisau-tulang.jpg",
                categories: ["dapur"],
                description: "Dapatkan presisi ahli dengan Pisau Tulang kami. Dirancang untuk tugas-tugas rumit seperti memotong tulang dan fillet, pisau ini adalah keperluan bagi setiap koki atau koki rumahan. Pisau tajam dan pegangan ergonomis membuat persiapan makanan menjadi mudah.",
                texture: "Logam",
                weight: 0.2,
                size: "30cm x 5cm"
            },
            {
                name: "Microwave Biasa",
                price: 425000,
                img: "microwave-biasa.jpg",
                categories: ["dapur"],
                description: "Sederhanakan rutinitas memasak Anda dengan Microwave Biasa kami. Alat serbaguna ini menawarkan pemanasan cepat dan efisien untuk hidangan, camilan, dan minuman favorit Anda. Fitur-fitur yang mudah digunakan menjadikannya teman dapur yang penting.",
                texture: "Logam",
                weight: 5,
                size: "90cm x 60cm"
            },
            {
                name: "Microwave Panggang",
                price: 450000,
                img: "microwave-panggang.jpg",
                categories: ["dapur"],
                description: "Tingkatkan pilihan memasak Anda dengan Microwave Panggang kami. Selain pemanasan standar, microwave ini dilengkapi dengan fungsi panggangan, memungkinkan Anda membuat hidangan yang renyah dan lezat. Sempurna untuk menyiapkan berbagai macam hidangan dengan mudah.",
                texture: "Logam",
                weight: 5,
                size: "90cm x 60cm"
            },
            {
                name: "Blender Genggam",
                price: 215000,
                img: "blender-genggam.jpg",
                categories: ["dapur"],
                description: "Blender Genggam kami adalah alat dapur serbaguna untuk menghaluskan, memotong, dan memurnikan. Desain ergonomis dan motor yang kuat membuat persiapan makanan cepat dan mudah, menyederhanakan tugas memasak Anda.",
                texture: "Logam",
                weight: 2,
                size: "80cm x 20cm"
            },
            {
                name: "Blender Multifungsi",
                price: 200000,
                img: "blender-multifungsi.jpg",
                categories: ["dapur"],
                description: "Rasakan kinerja penghalusan terbaik dengan Blender Multifungsi kami. Apakah Anda membuat smoothie, sup, atau saus, motor yang kuat dan pengaturan kecepatan yang beragam memastikan hasil yang sempurna setiap kali. Buat kreasi sehat dan lezat dengan mudah menggunakan alat dapur penting ini.",
                texture: "Logam",
                weight: 3,
                size: "80cm x 30cm"
            }
        ];
        

        await Product.deleteMany()

        await Product.insertMany(products)

        return res.status(201).json(defaultResponse(201, true, "Restored products successfully"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}