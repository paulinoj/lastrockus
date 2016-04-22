const Authentication = require('./server/controllers/authentication');
const passportService = require('./server/services/passport');
const passport = require('passport');

// create middleware that authenticates and does NOT create session aftewards
// since this is not cookie-based
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/test2', requireAuth, function(req, res) {
    res.send({ hi: 'there'});
  });

  app.post('/test', Authentication.signup);

}