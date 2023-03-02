const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const userInfo = {
        name: "Brandon Newsome",
        email: "brandon@gmail.com",
        password: "123456",
    };

    try {
        const newUser = await prisma.user.create({
            data: {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
            },
        });
        if (newUser) {
            res.json(newUser);
        }
    } catch (error) {
        console.log(error);
    }
};

const getUsers = async (req, res) => {
    const allUsers = await prisma.user.findMany();

    res.json(allUsers);
};

module.exports = {
    registerUser,
    getUsers,
};
