const Authentication = require('./server/controllers/authentication');

module.exports = function(app) {
  app.post('/test', Authentication.signup);

}