const router = require("express").Router();
const Post = require("../models/post");
const protect = require("../middleware.js");

router.route("/addPost").post(protect, (req, res, next) => {
  const post = req.body.post;
  const id = req.user;
  const phoneNumber = req.body.phoneNo;

  if (!post || !phoneNumber) {
    return res.status(201).send({ error: "Put your post here" });
  }

  console.log("sfsdfs");
  // If no user, create and save it to database
  const postDetails = new Post({
    email: post,
    user: id,
    contactNumber: phoneNumber,
  });

  postDetails.save();
  res
    .status(200)
    .send({ success: false, msg: "Authentication failed. Wrong password." });
});



module.exports = router;
