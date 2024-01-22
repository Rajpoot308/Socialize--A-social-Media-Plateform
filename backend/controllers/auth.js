import bcrypt from 'bcrypt';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    //check if exists
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }


    if (!data.username) {
        return res.status(409).json("Username is required");
    }
    if (!data.email) {
        return res.status(409).json("Email is required");
    }
    if (!data.password) {
        return res.status(409).json("Password is required");
    }
    try {
        // Check if user already exists
        const username = req.body.username;
        const existingUser = await User.find({ username });
        // console.log(existingUser);
        if (existingUser.length) {
            return res.status(409).json("Username already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const value = await User.create(data);
        console.log("registered");
        res.status(200).json({
            messege: "Registered Successfully",
            data: value
        });
    } catch (e) {
        res.status(500).json({ messege: `Error: ${e}` });
    }

}
export const login = async (req, res) => {
    try {
        const pass = req.body.password;
        const username = req.body.username;

        // Check if email exists in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check if the password matches the one in the database
        const isPasswordMatch = await bcrypt.compare(pass, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate and sign a JWT token
        const token = jwt.sign({ userId: user._id }, "my-secret-key");
        // Return the token in the responsea

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(user); //! Modification us Required.

    } catch (e) {
        res.status(409).json({ messege: `Error: ${e}` });
    }

}
export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            secure: true,
            samSite: "none"
        }).status(200).json("user has been logged out.");
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}