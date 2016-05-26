const passport = require('passport');
const models = require('../sequelize/models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

var jwtSecret;
if (process.env.JWTSECRET) {
  jwtSecret = process.env.JWTSECRET;
}
else
{
  jwtSecret = require('../../config')["secret"];
}

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false

  // $iLike makes search case insensitive

  models.User.findOne({where: { email: {$iLike: email} 
  }}).then(function(user) {
    if (!user) { return done(null, false); }

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });

  }).catch(function(err){
    if (err) { return done(err); }    
  });

});


// Setup options for JWT strategy
// Tell strategy where to look for JWT in request
// and give it string it needs to decode JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jwtSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  models.User.findById(payload.sub)
  .then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(function(err){
    if (err) { return done(err, false); }    
  });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);