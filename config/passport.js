const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

// Database connection setup
const connection = mysql.createConnection({
  host: 'mydb.c9f1qnynocki.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Maha1234',
  database: 'regis'
});

// Initialize Passport.js
module.exports = function(passport) {
  // Serialize user for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(function(id, done) {
    connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows) {
      done(err, rows[0]);
    });
  });

  // Local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {
    connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
      if (err) return done(err);
      if (!rows.length) return done(null, false, req.flash('loginMessage', 'No user found.'));
      
      // Check if password is correct
      if (!(rows[0].password === password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      // Successful login
      return done(null, rows[0]);
    });
  }));
};
