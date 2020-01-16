const express = require('express');
const passport = require('passport');
const Posts = require('../models/Posts');
const Admin = require('../models/Admin');
const Users = require('../models/User');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

router.get(('/viewusers'), ensureAuthenticated, (req, res) => {
  if (req.user.currentuser === "admin") {
    res.send('viewusers')

  } else {
    res.send('!unauthorized')
  }

});


module.exports = router;