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
                    name: "Aaliyah Graphic Tee",
                    brand: "Lewis Cupper",
                    price: "34.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "aaliyah_t.jpeg",
                },
                {
                    name: "Wu-Tang Graphic Tee",
                    brand: "DA WU",
                    price: "44.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "wutangshirt.png",
                },
                {
                    name: "Battleground Tour Tee",
                    brand: "BG Merch",
                    price: "49.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "battleground_t.jpeg",
                },
                {
                    name: "Budweiser Plain Text Thermal",
                    brand: "Frisco X Budweiser",
                    price: "79.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "budweiser_thermal.jpeg",
                },
                {
                    name: "Black Cargo Pants",
                    brand: "8 Down",
                    price: "119.99",
                    category: "clothing",
                    subcategory: "pants",
                    imgPath: "cargo_pants_black.jpeg",
                },
                {
                    name: "Columbia Scholar Tee",
                    brand: "Graduate",
                    price: "39.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "columbia_t.jpeg",
                },
                {
                    name: "Fenty Graffiti Tee",
                    brand: "Super Bowl X Fenty",
                    price: "59.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "fenty_t.jpeg",
                },
                {
                    name: "Black Flared Trousers",
                    brand: "MWARNA",
                    price: "139.99",
                    category: "clothing",
                    subcategory: "pants",
                    imgPath: "flare_trousers_black.jpeg",
                },
                {
                    name: "Fleece Sweats",
                    brand: "Lewis Cupper",
                    price: "59.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "fleece_sweats.jpeg",
                },
                {
                    name: "Harvard Scholar Tee",
                    brand: "Graduate",
                    price: "39.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "harvard_t.jpeg",
                },
                {
                    name: "Light Washed Bootcut Jeans",
                    brand: "Klevi's",
                    price: "59.99",
                    category: "clothing",
                    subcategory: "pants",
                    imgPath: "lightwash_bootcut.jpeg",
                },
                {
                    name: "Outkast Tour Tee",
                    brand: "BG Merch",
                    price: "49.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "outkast_t.jpeg",
                },
                {
                    name: "Vintage Pinks Graphic Tee",
                    brand: "Pinks",
                    price: "74.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "pinks_t.jpeg",
                },
                {
                    name: "Self Care Tee",
                    brand: "Flower Pot",
                    price: "39.99",
                    category: "clothing",
                    subcategory: "shirt",
                    imgPath: "self_care_t.jpeg",
                },
                {
                    name: "Olive Cargo Trousers",
                    brand: "8 Down",
                    price: "69.99",
                    category: "clothing",
                    subcategory: "pants",
                    imgPath: "slim_cargo_olive.jpeg",
                },
            ],
        });

        res.status(201).json(newItems);
    } catch (error) {
        res.status(400).json({ err: error });
    }
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
};
