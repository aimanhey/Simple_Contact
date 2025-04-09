const router = require("express").Router();
const Contact = require("../models/contact");
const protect = require("../middleware.js");
//const { contact } = require("../client/src/contact/ContactSlice.js");

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
router.route("/addContact").post(protect, async(req, res, next) => {
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

  try{
    const contactSaved = await contactDetails.save()
    res.status(200).send({
      success: true,
      msg: `The contact for ${post} has been saved!`,
    });
  }catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(422).send({ error: err.message });
  }

  // contactDetails.save((err, user) => {
  //   if (err) {
  //     return res.status(401).send({ error: "Put your post here" });
  //   }

  //   res
  //     .status(200)
  //     .send({ success: true, msg: `The contact for ${post} has been saved!` });
  // });
});

router.route("/:id").delete(protect, async(req, res, next) => {
  const post = req.params.id;
  let contact;

  console.log(post)
  console.log("sbjjdbdaad");

  try{
    contact = await Contact.findById({_id: post})
  }
  catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(422).send({ error: err.message });
  }

  try{
    contactDeleted = await contact.deleteOne();
    console.log('test')
    res.status(200).send({
      success: true,
      msg: `The contact for ${post} has been removed!`,
    });
  }
  catch(err){
    console.log(err+"test")
    return res.status(401).send({ error: `Something wrong ${err}` });
  }
  // Contact.findById({_id:post},(err, contact) => {

  //   if(contact){
  //     contact.remove((err, user) => {
  //       if (err) {
  //         return res.status(401).send({ error: "Something wrong" });
  //       }

  //       res.status(200).send({
  //         success: true,
  //         msg: `The contact for ${post} has been removed!`,
  //       });
  //     });}
  //   }
  // );

  
});

router.route("/:id").put(protect, async (req, res, next) => {
  const post = req.params.id;
  let contact;

  console.log("update");
  try{
    contact = await Contact.findById({_id: post})
  }
  catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(422).send({ error: err.message });
  }

  if (contact) {
    contact.contact = req.body.contact || contact.contact;
    contact.id = contact.id;
    contact.contactNumber = req.body.phoneNo || contact.contactNumber;
  }

  try{
    const contactSaved = await contact.save()
    res.status(200).send({
      success: true,
      msg: `The contact for ${post} has been updated!`,
    });
  }catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(422).send({ error: err.message });
  }
  
  // Contact.findById({ _id: post }, (err, contact) => {
  //   if (contact) {
  //     contact.contact = req.body.contact || contact.contact;
  //     contact.id = contact.id;
  //     contact.contactNumber = req.body.phoneNo || contact.contactNumber;
  //     // contact.image = req.image;
  //     /*
  //   contact.save();
  //   res.json({ message: "contact updated" });
  // } else {
  //   res.status(404);
  //   throw new Error("contact not found");
  // }*/

  //     contact.save((err, user) => {
  //       if (err) {
  //         return res.status(401).send({ error: "Something wrong" });
  //       }

  //       res.status(200).send({
  //         success: true,
  //         msg: `The contact modify for ${post} has been saved!`,
  //       });
  //     });
  //   }
  // });
});
module.exports = router;
