const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const protect = require("../middleware.js");

// List of available users
router.route("/").get(protect, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Register as user
router.route("/register").post((req, res, next) => {
  const email = req.body.email;

  const password = req.body.password;

  // If user does not provide email or password
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If user exists return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is already used " });
    }

    // If no user, create and save it to database
    const user = new User({
      email: email,
      password: password,
    });
    // Save user details
    user.save(function (err, user) {
      if (err) {
        return next(err);
      }

      // Respond the user was created
      jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
        res
          .status(200)
          .header("x-auth-token", "Bearer " + token)
          .send({
            token,
            user,
            msg: "good",
            success: true,
          });

        //   res.json({head, msg:"good"})
      });
    });
  });
});

// login route
router.route("/login").post((req, res, next) => {
  const tokenss = req.headers["x-auth-token"];

  // Check if the user is existing
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          jwt.sign(
            { user },
            "secretkey",
            { expiresIn: "30000000000s" },
            (err, token) => {
              const so = res
                .status(200)
                .header("x-auth-token", "Bearer " + token)
                .send({
                  token,
                  user,
                  msg: "good",
                  success: true,
                });
            }
          );
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  });
});

// Update user details (password)
router.route("/updateUser").post(protect, (req, res) => {
  const id = req.user._id;
  const password = req.body.password;

  // Check if the requested user is existing in database
  User.findOne({ _id: id }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else if (user && password) {
      user.password = password;
      // Save modified password
      user.save((err, jade) => {
        console.log(jade);
        jwt.sign(
          { user },
          "secretkey",
          { expiresIn: "3000000s" },
          (err, token) => {
            const so = res
              .status(200)
              .header("x-auth-token", "Bearer " + token)
              .send({
                token,
                user,
                msg: "update",
                success: true,
              });
          }
        );
      });
    } else {
      res.status(200).send({ msg: "Kenapa tak update?" });
    }
  });
});

router.route("/updatesUser").post(protect, (req, res) => {
  const id = req.user._id;
  const password = req.body.password;

  // Check if the requested user is existing in database
  const user = User.findOne({ _id: id }) ;
  
  
  
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else if (user && password) {
      user.password = password;
      // Save modified password
      user.save((err, jade) => {
        console.log(jade);
        jwt.sign(
          { user },
          "secretkey",
          { expiresIn: "3000000s" },
          (err, token) => {
            const so = res
              .status(200)
              .header("x-auth-token", "Bearer " + token)
              .send({
                token,
                user,
                msg: "update",
                success: true,
              });
          }
        );
      });
    } else {
      res.status(200).send({ msg: "Kenapa tak update?" });
    }
  
});

module.exports = router;
