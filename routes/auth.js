const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("started")
    console.log(profile)
    console.log("end")
    return done(null, profile);
  }
  
));
passport.serializeUser(function(User, done){
    done(null, User);
})
passport.deserializeUser(function(User, done){
    done(null, User);
})