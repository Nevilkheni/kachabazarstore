import express from "express";
import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.GOOGLE_SUCCESSREDIRECT_URL + "/dashboard",
        failureRedirect: process.env.GOOGLE_FAILUREREDIRECT_URL + "/login",
    })
);


router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: process.env.GITHUB_SUCCESSREDIRECT_URL + "/dashboard",
        failureRedirect: process.env.GITHUB_FAILUREREDIRECT_URL + "/login",
    })
);


router.get("/user", (req, res) => {
    res.send(req.user);
});
router.get("/logout", (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            return res.json({ success: true, message: "Logged out" });
        });
    });
});



router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

    res.json({ msg: "Login successful", token, user });



});
export default router;
