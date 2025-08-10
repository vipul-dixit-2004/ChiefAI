const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    try {
        const hashedPass = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPass
        });

        return res.status(200).json({ message: "User created successfully", name, email, _id: user.id });
    } catch (e) {
        console.log(e);
        if (e?.errorResponse?.code === 11000)
            return res.status(400).json({ message: "User already exists" });
        else
            return res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change for production
            sameSite: "strict",
        });

        return res.status(200).json({ message: "Login successful", name: user.name, email: user.email, _id: user.id });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

function handleUserLogout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };
