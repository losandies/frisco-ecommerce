const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addItem = async (req, res) => {
    const { name, brand, category, price, imgPath } = req.body;

    try {
        const newItems = await prisma.item.createMany({
            data: [
                {
                    name: "Aaliyah Graphic Tee",
                    brand: "Lewis Cupper",
                    price: "34.99",
                    category: "clothing",
                    subcategory: "shirts",
                    imgPath: "aaliyah_t.jpeg",
                },
            ],
        });

        res.status(201).json(newItems);
    } catch (error) {
        res.status(400).json({ err: error });
    }
};

const updateItem = async (req, res) => {
    const updatedItem = await prisma.item.updateMany({
        where: {
            name: "Pearl Smiley Bracelet",
        },
        data: {
            category: "accessories",
        },
    });

    res.status(200).json(updatedItem);
};

const getItem = async (req, res) => {
    const item = await prisma.item.findFirst({
        where: {
            name: "Pearl Smiley Bracelet",
        },
    });

    res.status(200).json(item);
};

const getAllItems = async (req, res) => {
    try {
        const allItems = await prisma.item.findMany({});

        res.status(200).json(allItems);
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    addItem,
    getAllItems,
    updateItem,
    getItem,
};
