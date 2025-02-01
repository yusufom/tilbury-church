const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");
const Partner = require("../models/partners");
const Volunteer = require("../models/volunteer");
const Project = require("../models/project");
const Donors = require("../models/donors");
const Events = require("../models/realEvent");
const postPicture = require("../models/postPicture");
const Gallery = require("../models/gallery");
const Blog = require("../models/post");
const Message = require("../models/message");
const httpMsgs = require("http-msgs");

const { getIndex } = require("../controller/website/index")

const { getAbout } = require("../controller/website/about")
const { getContact, postContact } = require("../controller/website/contact")

router.get("/", getIndex);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/ministries", async (req, res) => {
  res.render("ministries.ejs");
});

router.get("/gallery", async (req, res) => {
    res.render("gallery.ejs");
});

router.get("/statement", async (req, res) => {
    res.render("statement.ejs");
});

router.get("/statementbelief", async (req, res) => {
    res.render("statementbelief.ejs");
});





// router.get("/about", getAbout);


// router.post('/message', postContact);





// router.post("/message", async (req, res) => {
//   const { name, email, comments } = req.body;
//   const newMessage = new Message({
//     name,
//     email,
//     date: new Date(),
//     title: "new Message",
//     message: comments,
//     status: "unread",
//   });

//   const saveComment = await newMessage.save();


//   if (saveComment) {
//     httpMsgs.sendJSON(req, res, {
//       from: {
//         status: "200",
//         saveComment,
//       },
//     });

//     const USER = process.env;
//     let transporter = nodemailer.createTransport({
//       host: "smtp.zoho.com",
//       secure: true,
//       auth: {
//         user: USER.Email,
//         pass: USER.Mail_Password,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: "bookings@preskenhotels.com",
//       to: `${email}`,
//       subject: "Thanks for your Application!!!!",
//       html: `Thank you for applying for job on presken hotel and resorts. Kindly login to your portal using @ https://preskenhotels.com/login using your email and phone number as a password
//       <br />
//       <br />
//       Best Regards
//       <br />
//       Human Resource
//       <br />
//       Presken Hotel and Resorts
//     `,
//   });

//   transporter.sendMail(info, (err) => {
//     if (err) {
//       console.log("error");
//     } else {
//       console.log("sent");
//     }
//   });
//   }
// });

// router.get("/event/:id", async (req, res) => {
//   const setting = await Setting.find();
//   const id = req.params.id;
//   const partner = await Partner.find();
//   const event = await Events.find().limit(3);
//   const realEvent = await Events.findOne({ _id: id });
//   const postpicture = await postPicture.find();
//   const projectFooter = await Project.find().limit(3);

//   res.render("damilare.ejs", {
//     mySetting: setting[0],
//     partner,
//     realEvent,
//     event,
//     postpicture,
//     projectFooter,
//   });
// });

// router.post("/comment", async (req, res) => {
//   const { name, email, comments, id, date } = req.body;
//   const event = await Events.findOne({ _id: id });
//   const comment = event.comment;

//   const newComment = {
//     name,
//     email,
//     comments,
//     date,
//   };
//   comment.push(newComment);

//   const saveComment = await event.save();

//   if (saveComment) {
//     httpMsgs.sendJSON(req, res, {
//       from: {
//         status: "200",
//         saveComment,
//       },
//     });
//   }
// });

module.exports = router;
