const jwt = require('jwt-simple');
const models = require('../sequelize/models');

var jwtSecret;
if (process.env.JWTSECRET) {
  jwtSecret = process.env.JWTSECRET;
}
else
{
  jwtSecret = require('../../config')["secret"];
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  // "iat" stands for "issued at time"
  return jwt.encode({ sub: user.id, iat: timestamp, email: user.email }, jwtSecret);

}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token

  // passport assigns user to req.user
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide an email and password" });
  }

  // See if a user with the given email exists
  models.User.findOne({where: { email: {$iLike: email} 
  }}).then(function(existingUser) {
    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    models.User.create({
      email: email,
      password: password
    }).then(function(user) {
      res.json({ token: tokenForUser(user) });
    }).catch(function(err) {
      if (err) { return next(err); }
    });
  }).catch(function(err) {
    if (err) { return next(err); }
  });
};
