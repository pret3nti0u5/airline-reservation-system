// PassportJS with Google Oauth 2.0 stratergy boilerplate

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Define your User model in ../models/user.js
const User = require('../models/user');

passport.serializeUser((user, done) => {
  try {
    done(null, user.googleId);
  } catch (e) {
    done(e);
  }
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const user = await User.findOne({ googleId });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

// Define your clientID and clientSecret in ../config/dev.env

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      // Callback URL needs to be allowed in your Google Credentials settings
      // CHANGE `https://production-server-link/login/callback` once deployed to a server
      callbackURL: `${
        process.env.NODE_ENV === 'production'
          ? 'https://production-server-link/login/callback'
          : '/login/callback'
      }`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            title: '',
            name: profile.displayName,
            email: profile._json.email,
            mobileNo: '',
            selectedSeat: '',
            googleId: profile.id,
            bookings: [],
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);
