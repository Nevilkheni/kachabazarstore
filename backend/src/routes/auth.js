import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/dashboard",
        failureRedirect: "http://localhost:3000/login",
    })
);

router.get("/user", (req, res) => {
    res.send(req.user);
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.send("Logged out");
    });
});

export default router;
