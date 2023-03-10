const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addItem = async (req, res) => {
    const { name, brand, category, price, imgPath } = req.body;

    try {
        // const alreadyExists = await prisma.item.findFirst({
        //     where: {
        //         name: name,
        //     },
        // });

        // if (alreadyExists) {
        //     res.status(409).json({
        //         error: "User Already Exists. Please Log In",
        //     });
        // }

        const newItems = await prisma.item.createMany({
            data: [
                {
                    name: "1998 NBA Finals Hat",
                    brand: "Old Era",
                    price: "19.99",
                    category: "accessories",
                    subcategory: "hats",
                    imgPath: "1998_finals.jpeg",
                },
                {
                    name: "Fadidas Hoodie",
                    brand: "Fadidas",
                    price: "64.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "adidas_hoodie.jpeg",
                },
                {
                    name: "Vintage Hoodie",
                    brand: "Rodd Cambridge",
                    price: "74.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "balance_hoodie.jpeg",
                },
                {
                    name: "Beetlejuice Hoodie",
                    brand: "Beetlejuice X MISS ME YET?",
                    price: "89.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "beetlejuice_hoodie.jpeg",
                },
                {
                    name: "Black Square Sunglasses",
                    brand: "FRISCO",
                    price: "179.99",
                    category: "accessories",
                    subcategory: "sunglasses",
                    imgPath: "black_square_glasses.jpeg",
                },
                {
                    name: "Air Poormon BRED 1",
                    brand: "ZIKE",
                    price: "2.00",
                    category: "shoes",
                    subcategory: "sneakers",
                    imgPath: "bred_1.jpeg",
                },
                {
                    name: "Checkered Slide-on Vans",
                    brand: "Vans",
                    price: "39.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "checkered_vans.jpeg",
                },
                {
                    name: "Cherry 8-hole Boot",
                    brand: "Dr. Martens",
                    price: "119.99",
                    category: "shoes",
                    subcategory: "boots",
                    imgPath: "cherry_dr_martens.jpeg",
                },
                {
                    name: "Beige Wallabee Shoes",
                    brand: "Clarks",
                    price: "159.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "clarks.jpeg",
                },
                {
                    name: "Classic All-Stars",
                    brand: "Converse",
                    price: "29.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "classic_converse.jpeg",
                },
                {
                    name: "Clubmaster Sunglasses",
                    brand: "Ray Got Banned",
                    price: "169.99",
                    category: "accessories",
                    subcategory: "sunglasses",
                    imgPath: "clubmaster_glasses.jpeg",
                },
                {
                    name: "Marble Beanie",
                    brand: "Columbia",
                    price: "19.99",
                    category: "accessories",
                    subcategory: "hats",
                    imgPath: "columbia_beanie.jpeg",
                },
                {
                    name: "Cuban Link Ring",
                    brand: "FRISCO",
                    price: "79.99",
                    category: "accessories",
                    subcategory: "jewelry",
                    imgPath: "cuban_ring.jpeg",
                },
                {
                    name: "Black 8-hole Boot",
                    brand: "Dr Martens",
                    price: "139.99",
                    category: "shoes",
                    subcategory: "boots",
                    imgPath: "dr_martens.jpeg",
                },
                {
                    name: "Save The Earth Slide-On Vans",
                    brand: "Vans",
                    price: "59.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "earth_vans.jpeg",
                },
                {
                    name: "Green Beanie",
                    brand: "Bayern Tumeric",
                    price: "19.99",
                    category: "accessories",
                    subcategory: "hats",
                    imgPath: "green_beanie.jpeg",
                },
                {
                    name: "Green Square Sunglasses",
                    brand: "FRISCO",
                    price: "179.99",
                    category: "accessories",
                    subcategory: "sunglasses",
                    imgPath: "green_square_glasses.jpeg",
                },
                {
                    name: "Jordan 4",
                    brand: "Trike",
                    price: "199.99",
                    category: "shoes",
                    subcategory: "sneakers",
                    imgPath: "jordan_4.jpeg",
                },
                {
                    name: "Metal Square Sunglasses",
                    brand: "FRISCO",
                    price: "124.99",
                    category: "accessories",
                    subcategory: "sunglasses",
                    imgPath: "metal_square_glasses.jpeg",
                },
                {
                    name: "Obsessed Zip-Up Hoodie",
                    brand: "Number5",
                    price: "89.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "obsessed_hoodie.jpeg",
                },
                {
                    name: "Pearl Smiley Bracelet",
                    brand: "FRISCO",
                    price: "49.99",
                    category: "accesories",
                    subcategory: "jewelry",
                    imgPath: "pearl_bracelet.jpeg",
                },
                {
                    name: "Pearl Necklace",
                    brand: "FRISCO",
                    price: "69.99",
                    category: "accessories",
                    subcategory: "jewelry",
                    imgPath: "pearl_necklace.jpeg",
                },
                {
                    name: "Rainbow Baguette Ring",
                    brand: "FRISCO",
                    price: "699.99",
                    category: "accessories",
                    subcategory: "jewelry",
                    imgPath: "rainbow_ring.jpeg",
                },
                {
                    name: "Sneaks For Freaks",
                    brand: "Reebok",
                    price: "30.00",
                    category: "shoes",
                    subcategory: "sneakers",
                    imgPath: "reebok.jpeg",
                },
                {
                    name: "Rolling Stones Hat",
                    brand: "UNKNOWN",
                    price: "29.99",
                    category: "accessories",
                    subcategory: "hats",
                    imgPath: "rolling_stones_hat.jpeg",
                },
                {
                    name: "Subtle Message Hoodie",
                    brand: "Lifeline",
                    price: "39.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "stay_strong_hoodie.jpeg",
                },
                {
                    name: "Tinted Studio Glasses",
                    brand: "FRISCO",
                    price: "299.99",
                    category: "accessories",
                    subcategory: "sunglasses",
                    imgPath: "studio_glasses.jpeg",
                },
                {
                    name: "Studio Hoodie",
                    brand: "Day28",
                    price: "99.99",
                    category: "clothing",
                    subcategory: "hoodies",
                    imgPath: "studio_hoodie.jpeg",
                },
                {
                    name: "Suede Vans",
                    brand: "Vans",
                    price: "49.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "suede_vans.jpeg",
                },
                {
                    name: "Tennis Chain Necklace",
                    brand: "FRISCO",
                    price: "499.99",
                    category: "accessories",
                    subcategory: "jewelry",
                    imgPath: "tennis_necklace.jpeg",
                },
                {
                    name: "Textured All-Star",
                    brand: "Converse",
                    price: "49.99",
                    category: "shoes",
                    subcategory: "casual",
                    imgPath: "green_timberland.jpeg",
                },
                {
                    name: "Timberland Boots",
                    brand: "Timberland",
                    price: "199.99",
                    category: "shoes",
                    subcategory: "boots",
                    imgPath: "timberland.jpeg",
                },
                {
                    name: "Prem Air Max 1",
                    brand: "Travis Scott X Likey",
                    price: "259.99",
                    category: "shoes",
                    subcategory: "sneakers",
                    imgPath: "travis_airmax_1.jpeg",
                },
                {
                    name: "Yankees Fitted Cap",
                    brand: "Tru Era",
                    price: "29.99",
                    category: "accessories",
                    subcategory: "hats",
                    imgPath: "yankees_fitted.jpeg",
                },
            ],
        });

        res.status(201).json({ newItems });
    } catch (error) {
        res.status(400).json({ err: error });
    }
};

const updateItem = async (req, res) => {
    const updatedItem = await prisma.item.updateMany({
        where: {
            imgPath: "clarks.jpeg.jpeg",
        },
        data: {
            imgPath: "clarks.jpeg",
        },
    });

    res.status(200).json(updatedItem);
};

const getAllItems = async (req, res) => {
    try {
        const allItems = await prisma.item.findMany({});

        res.status(200).json(allItems);
    } catch (error) {}
};

module.exports = {
    addItem,
    getAllItems,
    updateItem,
};
