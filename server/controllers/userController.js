const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
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
    } catch (err) {
        res.json({ msg: err });
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
        res.json({ msg: err });
    }
};

const getCurrentUser = async (req, res) => {
    const { id } = req.user;

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
        }
        res.status(200).json(user);
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
        res.json({ msg: err });
    }
};

const deleteAllUsers = async () => {
    await prisma.user.deleteMany({});
};

const updateUserAddress = async (req, res) => {
    const { id } = req.user;
    const { street, city, zip, state } = req.body;

    if (!(street || city || zip || state)) {
        res.status(401).json({ msg: "Something Went Wrong" });
        return;
    }

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
            res.status(200).json(address);
        }
    } catch (err) {
        res.json({ msg: err });
    }
};

module.exports = {
    registerUser,
    getCurrentUser,
    getUsers,
    deleteAllUsers,
    loginUser,
    updateUserAddress,
};
