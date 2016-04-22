module.exports = function(app) {
  app.get('/water', function(req, res, next) {
    res.send(['water', 'phone', 'paper']);
  });
}