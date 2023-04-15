const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    console.log("route hit");
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!(firstName || lastName || email || password)) {
            res.status(400).json({ error: "Missing Fields" });
        }

        const userExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userExists) {
            res.status(409).json({
                error: "User Already Exists. Please Log In",
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: encryptedPassword,
            },
        });

        const token = jwt.sign({ id: newUser.id }, process.env.jwtSecret, {
            expiresIn: "1hr",
        });

        newUser.token = token;

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!(email || password)) {
        res.status(400).json({ error: "Missing Fields" });
    }

    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                address: true,
                orders: true,
            },
        });

        if (!foundUser) {
            res.status(400).json({
                error: "User doesnt exist. Please register an account",
            });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            res.status(401).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: foundUser.id }, process.env.jwtSecret, {
            expiresIn: "1hr",
        });

        foundUser.token = token;

        res.status(201).json(foundUser);
    } catch (err) {
        console.log(err);
    }
};

const getCurrentUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
            include: {
                address: true,
                orders: true,
            },
        });

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.jwtSecret, {
                expiresIn: "1hr",
            });

            user.token = token;

            res.status(200).json(user);
        }
    } catch (error) {
        res.json(error);
    }
};

const getUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();

        if (allUsers.length >= 1) {
            res.json(allUsers);
        } else if (allUsers.length < 1) {
            res.status(400).json({ msg: "No users found" });
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteAllUsers = async () => {
    await prisma.user.deleteMany({});
};

const getUserOrders = async (req, res) => {
    const { id } = req.body;
    const orders = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            orders: true,
        },
    });

    res.json(orders);
};

const updateUserAddress = async (req, res) => {
    const { id, street, city, zip, state } = req.body;

    if (!(street || city || zip || state))
        res.status(401).json({ msg: "Something Went Wrong" });

    try {
        const addressExists = await prisma.address.findFirst({
            where: {
                userId: id,
            },
        });

        if (addressExists) {
            await prisma.address.delete({
                where: {
                    userId: id,
                },
            });
        }

        const address = await prisma.address.create({
            data: {
                userId: id,
                street: street,
                city: city,
                zipCode: zip,
                state: state,
            },
        });

        if (address) {
            console.log("Address Added");
            res.status(200).json(address);
        }
    } catch (err) {
        console.log(err);
    }
};

const getUserAddress = async (req, res) => {
    const { id } = req.body;

    try {
        const address = await prisma.address.findFirst({
            where: {
                userId: id,
            },
        });

        if (address) {
            res.status(200).json(address);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registerUser,
    getCurrentUser,
    getUsers,
    deleteAllUsers,
    loginUser,
    updateUserAddress,
    getUserAddress,
    getUserOrders,
};
