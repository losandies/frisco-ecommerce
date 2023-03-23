const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    const { items, total, user } = req.body;
    // console.log({ items: items, total: total, user: user });

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

        if (newOrder) {
            console.log("New Order Placed");
            res.status(200).json({ newOrder });
        }
    } catch (err) {
        console.log(err);
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
