const router = require("express").Router();
const Contact = require("../models/contact");
const protect = require("../middleware.js");

router.route("/").get((req, res) => {
  console.log("ada baca");
  Contact.find()
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/listAll").get(protect, (req, res, next) => {
  const users = req.user;

  Contact.find({ user: users })
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add contact
router.route("/addContact").post(protect, (req, res, next) => {
  const post = req.body.contact;
  const id = req.user;
  const phoneNumber = req.body.phoneNo;
  // const image = req.image;

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

  contactDetails.save((err, user) => {
    if (err) {
      return res.status(401).send({ error: "Put your post here" });
    }

    res
      .status(200)
      .send({ success: true, msg: `The contact for ${post} has been saved!` });
  });
});

router.route("/:id").delete(protect, (req, res, next) => {
  const post = req.params.id;

  console.log("sbjjdbdaad");
  const contact = Contact.findById({_id:post});

  if (contact) {
    console.log(contact)
    contact.remove();
    res.json({ message: "contact removed" });
  } else {
    res.status(404);
    throw new Error("contact not found");
  }
});

router.route("/:id").put(protect, (req, res, next) => {
  const post = req.params.id;

  console.log("update");
  Contact.findById({ _id: post }, (err, contact) => {
    if (contact) {
      contact.contact = req.body.contact || contact.contact;
      contact.id = contact.id;
      contact.contactNumber = req.body.phoneNo || contact.contactNumber;
      // contact.image = req.image;
      /*
    contact.save();
    res.json({ message: "contact updated" });
  } else {
    res.status(404);
    throw new Error("contact not found");
  }*/

      contact.save((err, user) => {
        if (err) {
          return res.status(401).send({ error: "Something wrong" });
        }

        res.status(200).send({
          success: true,
          msg: `The contact modify for ${post} has been saved!`,
        });
      });
    }
  });
});
module.exports = router;
