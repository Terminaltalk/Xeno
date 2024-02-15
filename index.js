const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;

const app = express();

app.use(session({
    secret: 'EIIE1K6oK6h48UOPXNIlbtGE36auUJWK',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: '1088767394094268428',
    clientSecret: 'EIIE1K6oK6h48UOPXNIlbtGE36auUJWK',
    callbackURL: 'https://discord.com/oauth2/authorize?client_id=1088767394094268428&response_type=code&redirect_uri=https%3A%2F%2Fterminaltalk.github.io%2FXeno%2F&scope=identify+email+guilds',
    scope: ['identify'] // Additional scopes if needed
}, (accessToken, refreshToken, profile, done) => {
    // Logic to handle user authentication and saving profile data
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/login', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/' // Redirect to home page if authentication fails
}), (req, res) => {
    // Redirect to a specific page after successful authentication
    res.redirect('/success');
});

app.get('/success', (req, res) => {
    // This is the specific page where the user is redirected after successful authentication
    res.send('You have successfully authorized your account. Welcome to our website!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

