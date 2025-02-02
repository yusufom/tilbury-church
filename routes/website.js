const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");
const Post = require("../models/post");
const Room = require("../models/room");
const Project = require("../models/project");
const Donors = require("../models/donors");
const Events = require("../models/realEvent");
const postPicture = require("../models/postPicture");
const Gallery = require("../models/gallery");
const Blog = require("../models/post");
const Message = require("../models/message");
const httpMsgs = require("http-msgs");

const Comment = require("../models/comment");

const { getIndex } = require("../controller/website/index")

const { getAbout } = require("../controller/website/about")
const { getContact, postContact } = require("../controller/website/contact");

router.get("/", getIndex);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/ministries", async (req, res) => {
  res.render("ministries.ejs");
});

router.get("/gallery", async (req, res) => {
  const gallery = await Gallery.find();
  res.render("gallery.ejs", {
    gallery    
  });
});

router.get("/statement", async (req, res) => {
    res.render("statement.ejs");
});

router.get("/service", async (req, res) => {
    res.render("service.ejs");
});

router.get("/ourministries", async (req, res) => {
    res.render("ministerss.ejs");
});

router.get("/sermon", async (req, res) => {
  const event = await Post.find();  
  const PostPictures = await postPicture.find();
    res.render("sermon.ejs", {
      event,
      postPicture: PostPictures
    });
});


router.get("/sermonsingle/:id", async (req, res) => {
  const id = req.params.id;
  const News = await Post.findOne({ name: id });
  const image = await postPicture.find();
    res.render("sermonsingle.ejs", {
      News,
      image,
    });
});

router.get("/event", async (req, res) => {
    res.render("event.ejs");
});

router.get("/donation", async (req, res) => {
  const allRoom = await Room.find();
  res.render("donation.ejs", {
    allRoom
  });
});

router.get("/donationsingle/:id", async (req, res) => {
  const id = req.params.id;
  const News = await Room.findOne({ name: id });
    res.render("donationsingle.ejs", {
      News
    });
});

router.post("/message", async (req, res) => {
  const { email } = req.body;

  const checkMail = await Comment.findOne({email: email});

  if(checkMail){
    httpMsgs.sendJSON(req, res, {
        from: {
          status: "400",
          comment: "Email Already Exist"
        },
    });
  }else {
      const newMessage = new Comment({
        email,
        date: new Date()
      });
    
      const saveComment = await newMessage.save();
    
      if (saveComment) {
        httpMsgs.sendJSON(req, res, {
          from: {
            status: "200",
            saveComment,
            comment: "Thank you for subscribing to our newsletter"
          },
        });
      }
  }
  
})

router.post("/contactUs", async (req, res) => {
    const { email, firstName, lastName, phoneNumber, message } = req.body;
  
    const newMessage = new Message({
      email,
      firstName, 
      lastName,
      phoneNumber,
      message,
      date: new Date()
    });
      
        const saveComment = await newMessage.save();
      
        if (saveComment) {
          httpMsgs.sendJSON(req, res, {
            from: {
              status: "200",
              saveComment,
              comment: "Thank you for contacting us. Will will get back to you as fast as possible"
            },
          });
        }
  })

module.exports = router;
