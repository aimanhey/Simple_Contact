const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/register').post((req,res, next)=>{
    const email = req.body.email;
   
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send( {error: 'You must provide email and password'});
    }
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user exists return error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is already used '});
        }

        // If no user, create and save it to database
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err,usert) {
            if (err) { return next(err);}
          

            // Respond the user was created
            jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
   
                res.header("x-auth-token", "Bearer "+ token).send({
                  token,
                  user
                }); 
        });
    });

  }); });

  module.exports = router;