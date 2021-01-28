const router = require('express').Router();
const User = require('../models/post');
const protect = require('middleware.js');






  router.route('/addPost').post(protect,(req,res, next)=>{
    const post = req.body.post;
   
    const phoneNumber = req.body.phoneNo;

    


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
   
              res.status(200).header("x-auth-token", "Bearer "+ token).send({
                  token,
                  user,
                  msg:"good",
                  success:true
                }); 

             //   res.json({head, msg:"good"})
        });
    });

  }); });


  router.route("/login").post((req,res,next)=>{

    const tokenss = req.headers["x-auth-token"];

    if(tokenss){
        res.json({msg:tokenss});
    }
     User.findOne({email:req.body.email},(err,user)=>{
        if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else{
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
   
                  const so = res.status(200).header("x-auth-token", "Bearer "+ token).send({
                        token,
                        user,
                        msg:"good",
                        success:true
                      }); 
              });
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });  
    }
     })
  });

  module.exports = router;