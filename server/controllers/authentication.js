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
  return jwt.encode({ sub: user.id, iat: timestamp }, jwtSecret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token

  models.User.findOne({where: { id: req.user.id }}).then(function(user) {
    var userSongListCounts = {}, totalSongListCounts = {};

    models.SongList.findAll({where: { active: true }}).then(function(songLists) {
      for (var i = 0; i < songLists.length; i++) {
        if (totalSongListCounts[songLists[i].genre]) {
          totalSongListCounts[songLists[i].genre]++;
        }
        else
        {
          totalSongListCounts[songLists[i].genre] = 1;
        }
      }
      for (var genre in totalSongListCounts) {
        userSongListCounts[genre] = 0;
      }
      user.getSongLists({where: { active: true }}).then(function(songLists) {
        for (var i = 0; i < songLists.length; i++) {
          userSongListCounts[songLists[i].genre]++;
        }
        // passport assigns user to req.user
        res.send({ token: tokenForUser(req.user), userSongListCounts, totalSongListCounts });
      });
    });
  });
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

    var userSongListCounts = {}, totalSongListCounts = {};

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    models.User.create({
      email: email,
      password: password
    }).then(function(user) {
      models.SongList.findAll({where: { active: true }}).then(function(songLists) {
        for (var i = 0; i < songLists.length; i++) {
          if (totalSongListCounts[songLists[i].genre]) {
            totalSongListCounts[songLists[i].genre]++;
          }
          else
          {
            totalSongListCounts[songLists[i].genre] = 1;
          }
        }
        for (var genre in totalSongListCounts) {
          userSongListCounts[genre] = 0;
        }  
        res.json({ token: tokenForUser(user), userSongListCounts, totalSongListCounts });
      }).catch(function(err) {
        if (err) { return next(err); }      
      });
    }).catch(function(err) {
      if (err) { return next(err); }      
    });
  }).catch(function(err) {
    if (err) { return next(err); }
  });
};
