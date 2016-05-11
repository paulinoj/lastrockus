const Authentication = require('./server/controllers/authentication');
const Music = require('./server/controllers/music');
const passportService = require('./server/services/passport');
const passport = require('passport');

// create middleware that authenticates and does NOT create session aftewards
// since this is not cookie-based
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/test2', requireAuth, function(req, res) {
    res.send({ hi: 'there'});
  });
  app.get('/music/classical', Music.classical);
  app.get('/music/eighties', Music.eighties);
  app.get('/song/:number', Music.song);    
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}