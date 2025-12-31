import express from "express";
import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";

const router = express.Router();
const getDynamicCallbackURL = (req, provider) => {
    const host = req.get('host');
    const protocol = req.protocol;
    return `${protocol}://${host}/auth/${provider}/callback`;
};

const getDynamicRedirectURL = (req, path = '') => {
    const origin = req.get('origin') || req.get('referer')?.split('/').slice(0, 3).join('/');
    if (origin) {
        return `${origin}${path}`;
    }
    return `${process.env.GOOGLE_SUCCESSREDIRECT_URL || "http://localhost:3000"}${path}`;
};

router.get("/google", (req, res, next) => {
    const callbackURL = getDynamicCallbackURL(req, 'google');
    
    const googleStrategy = new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let avatarUrl = null;

                if (profile.photos && profile.photos[0] && profile.photos[0].value) {
                    avatarUrl = profile.photos[0].value.split("=")[0] + "?sz=400";
                }

                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error("Email not provided by Google"), null);
                }

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    const existingUser = await User.findOne({ email });

                    if (existingUser) {
                        if (existingUser.googleId && existingUser.googleId !== profile.id) {
                            return done(new Error("User already exists with this Google account"), null);
                        }
                        existingUser.googleId = profile.id;
                        existingUser.name = profile.displayName;
                        existingUser.avatar = avatarUrl;
                        await existingUser.save();
                        return done(null, existingUser);
                    }

                    try {
                        user = await User.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: email,
                            avatar: avatarUrl,
                        });
                    } catch (createErr) {
                        if (createErr.code === 11000) {
                            const existingUser = await User.findOne({ email });
                            if (existingUser) {
                                existingUser.googleId = profile.id;
                                existingUser.name = profile.displayName;
                                existingUser.avatar = avatarUrl;
                                await existingUser.save();
                                return done(null, existingUser);
                            }
                        }
                        throw createErr;
                    }
                } else {
                    user.name = profile.displayName;
                    user.email = email;
                    user.avatar = avatarUrl;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                console.error("Google OAuth error:", err);
                return done(err, null);
            }
        }
    );

    passport.use('google-dynamic', googleStrategy);
    
    passport.authenticate('google-dynamic', { scope: ["profile", "email"] })(req, res, next);
});

router.get("/github", (req, res, next) => {
    const callbackURL = getDynamicCallbackURL(req, 'github');
    
    const githubStrategy = new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            callbackURL: callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value || null;

                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    if (email) {
                        const existingUser = await User.findOne({ email });

                        if (existingUser) {
                            if (existingUser.githubId && existingUser.githubId !== profile.id) {
                                return done(new Error("User already exists with this GitHub account"), null);
                            }
                            existingUser.githubId = profile.id;
                            existingUser.name = profile.displayName;
                            existingUser.avatar = profile.photos?.[0]?.value || null;
                            await existingUser.save();
                            return done(null, existingUser);
                        }
                    }

                    try {
                        user = await User.create({
                            githubId: profile.id,
                            name: profile.displayName,
                            email: email,
                            avatar: profile.photos?.[0]?.value || null,
                        });
                    } catch (createErr) {
                        if (createErr.code === 11000 && email) {
                            const existingUser = await User.findOne({ email });
                            if (existingUser) {
                                existingUser.githubId = profile.id;
                                existingUser.name = profile.displayName;
                                existingUser.avatar = profile.photos?.[0]?.value || null;
                                await existingUser.save();
                                return done(null, existingUser);
                            }
                        }
                        throw createErr;
                    }
                } else {
                    user.name = profile.displayName;
                    if (email) user.email = email;
                    user.avatar = profile.photos?.[0]?.value || null;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                console.error("GitHub OAuth error:", err);
                return done(err, null);
            }
        }
    );

    passport.use('github-dynamic', githubStrategy);
    
    passport.authenticate('github-dynamic', { scope: ["user:email"] })(req, res, next);
});
router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google-dynamic", (err, user) => {
            if (err) {
                console.error("Google OAuth callback error:", err);
                const errorMessage = encodeURIComponent(
                    err.message || "User already exists with this Google account"
                );
                const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                return res.redirect(`${redirectURL}?error=${errorMessage}`);
            }
            if (!user) {
                const errorMessage = encodeURIComponent("Authentication failed. Please try again.");
                const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                return res.redirect(`${redirectURL}?error=${errorMessage}`);
            }
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    const errorMessage = encodeURIComponent("Login failed. Please try again.");
                    const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                    return res.redirect(`${redirectURL}?error=${errorMessage}`);
                }
                const successURL = getDynamicRedirectURL(req, '/dashboard');
                return res.redirect(successURL);
            });
        })(req, res, next);
    }
);

router.get(
    "/github/callback",
    (req, res, next) => {
        passport.authenticate("github-dynamic", (err, user) => {
            if (err) {
                console.error("GitHub OAuth callback error:", err);
                const errorMessage = encodeURIComponent(
                    err.message || "User already exists with this GitHub account"
                );
                const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                return res.redirect(`${redirectURL}?error=${errorMessage}`);
            }
            if (!user) {
                const errorMessage = encodeURIComponent("Authentication failed. Please try again.");
                const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                return res.redirect(`${redirectURL}?error=${errorMessage}`);
            }
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    const errorMessage = encodeURIComponent("Login failed. Please try again.");
                    const redirectURL = getDynamicRedirectURL(req, '/Auth/login');
                    return res.redirect(`${redirectURL}?error=${errorMessage}`);
                }
                const successURL = getDynamicRedirectURL(req, '/dashboard');
                return res.redirect(successURL);
            });
        })(req, res, next);
    }
);




router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ msg: "All fields required" });

        const userExist = await User.findOne({ email });
        if (userExist) {
            if (userExist.password === null && (userExist.googleId || userExist.githubId)) {
                return res.status(409).json({
                    msg: "User already exists with this email. Please login with Google or GitHub."
                });
            }
            return res.status(409).json({ msg: "Email already registered. Please use a different email or login instead." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ msg: "Email already registered. Please use a different email or login instead." });
        }
        console.error("Registration error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ msg: "All fields required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ msg: "Email not found. Please check your email or register first." });

        if (!user.password) {
            return res.status(401).json({
                msg: "This account was created with Google/GitHub. Please use social login."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ msg: "Incorrect password. Please try again." });

        req.login(user, (err) => {
            if (err) {
                console.error("Login error:", err);
                return res.status(500).json({ msg: "Server error" });
            }
            return res.json({ success: true, message: "Logged in" });
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});


router.get("/user", (req, res) => {
    res.send(req.user);
});

router.get("/check", (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.status(401).json({ authenticated: false, message: "Not authenticated" });
    }
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            });
            return res.json({ success: true, message: "Logged out" });
        });
    });
});

export default router;
