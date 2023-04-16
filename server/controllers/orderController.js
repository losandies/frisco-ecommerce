const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    const { items, total, user } = req.body;

    if (!(items || total || user))
        res.status(401).json({ msg: "Something Went Wrong" });

    try {
        const newOrder = await prisma.order.create({
            data: {
                userId: user.id,
                items: items,
                total: total,
            },
        });

        res.status(200).json(newOrder);
    } catch (err) {
        res.json({ msg: err });
    }
};

const getAllOrders = async (req, res) => {
    const orders = await prisma.order.findMany();

    if (orders) {
        res.status(200).json(orders);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
};
