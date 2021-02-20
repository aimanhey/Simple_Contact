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

router.route("/:id").delete(protect, (req, res, next) => {
  const post = req.params.id
  
  console.log("sbjjdbdaad");
  const contact = await Contact.findById(post)

  if (contact) {
    await contact.remove()
    res.json({ message: 'contact removed' })
  } else {
    res.status(404)
    throw new Error('contact not found')
  }
 
  
});


module.exports = router;
