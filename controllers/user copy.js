const router = require('express').Router();
const Post = require('../models/post');
const protect = require('middleware.js');






  router.route('/addPost').post(protect,(req,res, next)=>{
    const post = req.body.post;
    const id =  req.user._id;
    const phoneNumber = req.body.phoneNo;

    


    if (!post || !phoneNumber) {
        return res.status(201).send( {error: 'Put your post here'});
    }
   

      
        // If no user, create and save it to database
        const postDetails = new Post({
            email: post,
            user:id,
            contactNumber: phoneNumber
        });

        postDetails.save();
   });


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