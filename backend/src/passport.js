import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import User from "./models/User.js";


// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: process.env.GOOGLE_CALLBACK_URL + "/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await User.findOne({ googleId: profile.id });

//                 if (!user) {
//                     user = await User.create({
//                         googleId: profile.id,
//                         name: profile.displayName,
//                         email: profile.emails[0].value,
//                         avatar: profile._json.picture.replace("=s96-c", "=s400-c"),
//                     });
//                 } else {
//                     user.name = profile.displayName;
//                     user.email = profile.emails[0].value;
//                     user.avatar = profile._json.picture.replace("=s96-c", "=s400-c");
//                     await user.save();
//                 }

//                 return done(null, user);
//             } catch (err) {
//                 done(err, null);
//             }
//         }
//     )
// );



passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: (process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8000') + "/auth/google/callback",
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
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            callbackURL: (process.env.GITHUB_CALLBACK_URL || 'http://localhost:8000') + "/auth/github/callback",
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
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;


