const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        // find or create user in the database
        const user = await prisma.user.upsert({
            where: { googleId: profile.id },
            update: {
                email: profile.emails[0].value,
                displayName: profile.displayName,
                profilePictureUrl: profile.photos[0].value,
                accessToken,
                refreshToken,
            },
            create: {
                googleId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                profilePictureUrl: profile.photos[0].value,
                accessToken,
                refreshToken,
            },
        });
        cb(null, user); // no error, return user
    } catch (err) {
        cb(err, null); // error, return null
    }
  }
));

// serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(async function(id, done) {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});