var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Go to google login page
router.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account' 
  })
);

// Google sends back the session token and then redirects to the callback URL
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: 'http://localhost:5173/login'
  })
)

router.get('/protected', (req, res) => {
  if(!req.user) {
    res.redirect('/');
    return;
  }
  res.json(req.user);
});

router.get('/isauth', (req, res) => {
  if(req.user) {
    res.json({ user: req.user });
  }
  else {
    res.json({user: null, message: 'Not authenticated'});
  }
});

router.get('/logout', (req, res) => {
  req.logOut((err) => {
    if(err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('http://localhost:5173/login');
  });
});

module.exports = router;
