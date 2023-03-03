const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    console.log("route hit");
    const { name, email, password } = req.body;

    try {
        if (!(name || email || password)) {
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
                name,
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

const getUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();

        if (allUsers.length > 1) {
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

module.exports = {
    registerUser,
    getUsers,
    deleteAllUsers,
    loginUser,
};
