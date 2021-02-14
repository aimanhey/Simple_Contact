const router = require("express").Router();
const Contact = require("../models/contact");
const protect = require("../middleware.js");


// Add contact
router.route("/addContact").post(protect, (req, res, next) => {
  const post = req.body.contact;
  const id = req.user;
  const phoneNumber = req.body.phoneNo;

  if (!post || !phoneNumber) {
    return res.status(201).send({ error: "Put your post here" });
  }

  console.log("sfsdfs");
  // The way to apply information to Object
  const contactDetails = new Contact({
    contact: post,
    user: id,
    contactNumber: phoneNumber,
  });

  contactDetails.save();
  res
    .status(200)
    .send({ success: false, msg: "Authentication failed. Wrong password." });
});



module.exports = router;
