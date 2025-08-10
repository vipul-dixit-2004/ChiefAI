const express = require('express');
const { handleUserSignup, handleUserLogin, handleUserLogout } = require('../Controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');
const { default: upload } = require('../utils/upload');
const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Authenticated",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                isFlowComplete: user.isFlowComplete,
                dietary_preference: user.dietary_preference,
                allergies: user.allergies,
                intolerances: user.intolerances,
                profilePic: user.profilePic
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
    }
});

// In userRoutes.js
router.put("/update", authMiddleware, async (req, res) => {
    try {
        const { name, email, password, gender, dietary_preference, allergies, intolerances } = req.body;
        const updateData = { name, email, gender, dietary_preference, isFlowComplete: false };

        if (password && password.trim() !== "") {
            const { hashPassword } = require("../utils/hash");
            updateData.password = await hashPassword(password);
        }

        if (gender.length && dietary_preference != 'none') {
            updateData.isFlowComplete = true;
        } else {
            updateData.isFlowComplete = false;
        }
        if (Array.isArray(allergies)) updateData.allergies = allergies;
        if (Array.isArray(intolerances)) updateData.intolerances = intolerances;
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
