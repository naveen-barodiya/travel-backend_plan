import bcrypt from "bcrypt";
import User from "../models/User.js";

/**
 * REGISTER / LOGIN (combined for simplicity)
 */
export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        let user = await User.findOne({ email });

        // 👉 If user does not exist → REGISTER
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        }

        // 👉 If user exists → LOGIN
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("Auth Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
