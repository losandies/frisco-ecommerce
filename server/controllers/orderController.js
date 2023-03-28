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
            console.log(`Order Placed By ${user.firstName}`);
        }
    } catch (err) {
        console.log(err);
    }
};

const findOrdersByUserId = async (req, res) => {
    const { id } = req.body;

    const order = await prisma.order.findMany({
        where: {
            user: {
                is: {
                    id: id,
                },
            },
        },
    });

    if (order) {
        res.status(200).json(order);
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
    findOrdersByUserId,
};
