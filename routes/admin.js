var express = require("express");
var multer = require("multer");
const httpMsgs = require("http-msgs");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const Partners = require("../models/partners");
const Course = require("../models/course");
const Volunteer = require("../models/volunteer");
const Comment = require("../models/comment");
const Room = require("../models/room");
const ManifestRoom = require("../models/manifestRoom");
const Review = require("../models/review");
const Booking = require("../models/booking");
const Message = require("../models/message");
const AllForm = require("../models/form");
const Project = require("../models/project");
const Facilities = require("../models/facilities");
const Setting = require("../models/Setting");
const Gallery = require("../models/gallery");
const Post = require("../models/post");
const Resturant = require("../models/resturant");
const jobApplication = require("../models/jobApplication");
const Leave = require("../models/leave");
const JOB = require("../models/job");
const TheBooking = require("../models/books");

const BookingResult = require("../models/bookingresult");


const BookRestaurant = require("../models/bookresturant");

const nodemailer = require("nodemailer");
const damilare = require("../models/realEvent");
const PostPicture = require("../models/postPicture");

const Professions = require("../models/professions");

const User = require("../models/User");
const Logo = require("../models/logo");
const Staff = require("../models/staff");

var app = express.Router();

app.get("/logout", authenticated, (req, res) => {
  req.logOut();
  res.redirect("/login");
});

app.get("/", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const project = await Project.find().limit(4);
  const volunteer = await Volunteer.find();
  const picture = await PostPicture.find();
  const partner = await Partners.find().limit(4);
  const event = await damilare.find().limit(4);
  const user = req.user;

  let theHotel;
  let allRoom; 

  if(user.accountType != "branch"){
    theHotel = [];
    allRoom = []
  }

  if(user.accountType == "branch"){
    theHotel = await Post.findOne({ _id: user.office });
    allRoom = await Room.find({hotel: theHotel._id});
  }
  


  const date = new Date();
  let day;
  let month;
  let days = String(date.getDate());
  let months = String(date.getMonth());
  const year = date.getFullYear();

  if(days.length == 1){
    day = '0' + Number(date.getDate());
  }

  if(days.length != 1){
    day = date.getDate();
  }

  if(months.length == 1){
    month = '0' + Number(date.getMonth() + 1);
  }

  if(months.length != 1){
    month = Number(date.getMonth() + 1);
  }
  
  let the = year + "-" + month + "-" + day;

  const allBooking = await Booking.find({ });

  const allJob = await JOB.find();
  const allEmployee = await Staff.find();

  const partnerall = await jobApplication.find().countDocuments();
  const eventall = await damilare.find().countDocuments();
  const projectall = await Resturant.find().countDocuments();
  const volunteerall = await Volunteer.find().countDocuments();
  res.render("overview.ejs", {
    allMessage,
    volunteer,
    project,
    partner,
    allJob,
    allEmployee,
    user,
    event,
    theHotel,
    the,
    allRoom,
    picture,
    partnerall,
    allBooking,
    eventall,
    projectall,
    volunteerall,
  });
});

app.get("/viewcourse/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const project = await Course.findOne({ _id: req.params.id });
  const user = req.user;
  res.render("viewProject.ejs", {
    allMessage,
    project,
    user,
  });
});

app.get("/volunteer", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const allVolunteer = await Volunteer.find();
  const user = req.user;
  res.render("volunteer.ejs", {
    allVolunteer,
    allMessage,
    user,
  });
});

app.get("/addVolunteer", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addVolunteer.ejs", {
    allMessage,
    user,
  });
});

app.get("/createResturant", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("createResturant.ejs", {
    allMessage,
    user,
  });
});

app.get("/addResource", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addResource.ejs", {
    allMessage,
    user,
  });
});
app.post("/deleteCourse/:id", authenticated, async (req, res) => {
  const projectId = req.params.id;
  const deleteProject = await Course.deleteOne({ _id: projectId });

  if (deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteProject,
      },
    });
  }

  if (!deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

var storageVolunteer = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/volunteer/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload2 = multer({
  storage: storageVolunteer,
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/partners/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

app.get("/partner", authenticated, async (req, res) => {
  const allPartners = await Partners.find();
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("partner.ejs", {
    allPartners,
    user,
    allMessage,
  });
});

app.get("/create", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addPost.ejs", {
    allMessage,
    user,
  });
});

app.get("/addReview", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const allHotel = await Post.find();
  const user = req.user;
  res.render("addReview.ejs", {
    allMessage,
    allHotel,
    user,
  });
});

app.post("/deleteVolunteer/:id", authenticated, async (req, res) => {
  const projectId = req.params.id;
  const deleteProject = await Volunteer.deleteOne({ _id: projectId });

  if (deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteProject,
      },
    });
  }

  if (!deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/deleteFacilities/:id", authenticated, async (req, res) => {
  const projectId = req.params.id;
  const deleteProject = await Facilities.deleteOne({ _id: projectId });

  if (deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteProject,
      },
    });
  }

  if (!deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/resturant", authenticated, async (req, res) => {
  const allResturant = await Resturant.find();
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("resturant.ejs", {
    allResturant,
    allMessage,
    user,
  });
});

app.post(
  "/addPartner",
  authenticated,
  upload.single("imagename"),
  async function (req, res, next) {
    const { title } = req.body;
    const theDate = new Date();
    const date = `${
      Number(theDate.getDay()) < 10 ? `0${theDate.getDay()}` : theDate.getDay()
    }-${
      Number(theDate.getMonth() + 1) < 10
        ? `0${theDate.getMonth() + 1}`
        : theDate.getMonth() + 1
    }-${
      Number(theDate.getFullYear()) < 10
        ? `0${theDate.getFullYear()}`
        : theDate.getFullYear()
    }`;

    const time = `${
      Number(theDate.getHours()) < 10
        ? `0${theDate.getHours()}`
        : theDate.getHours()
    }:${
      Number(theDate.getMinutes()) < 10
        ? `0${theDate.getMinutes()}`
        : theDate.getMinutes()
    }:${
      Number(theDate.getSeconds()) < 10
        ? `0${theDate.getSeconds()}`
        : theDate.getSeconds()
    }`;
    const newPartners = new Partners({
      name: title,
      logo: JSON.stringify(req.file),
      date: date,
      time: time,
    });

    const savePartners = await newPartners.save();
    if (savePartners) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          savePartners,
        },
      });
    }

    if (!savePartners) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addResturant",
  authenticated,
  upload.array("imagename", 10),
  async function (req, res, next) {
    const {
      title,
      lunchTime,
      dinnerTime,
      barTime,
      contactNumber,
      description,
    } = req.body;
    const theDate = new Date();

    const newResturant = new Resturant({
      name: title,
      logo: JSON.stringify(req.files),
      lunchTime,
      dinnerTime,
      barTime,
      contactNumber,
      description,
    });

    const savePartners = await newResturant.save();
    if (savePartners) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          savePartners,
        },
      });
    }

    if (!savePartners) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post("/addJob", authenticated, async function (req, res, next) {
  const {
    jobName,
    jobType,
    department,
    location,
    deadline,
    jobSummary,
    responsibility,
    requirement,
  } = req.body;
  const theDate = new Date();

  const newJob = new JOB({
    jobName,
    jobType,
    department,
    location,
    deadline,
    jobSummary,
    responsibility,
    requirement,
  });

  const savePartners = await newJob.save();
  res.redirect("/admin/job");
});

app.get("/addPartner", authenticated, async function (req, res) {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addPartner.ejs", {
    allMessage,
    user,
  });
});

app.get("/jobApplication", authenticated, async function (req, res) {
  const allMessage = await Message.find({ status: "unread" });
  const jobApplications = await jobApplication.find();
  const user = req.user;
  res.render("jobApplication.ejs", {
    allMessage,
    jobApplications,
    user,
  });
});

app.get("/createJob", authenticated, async function (req, res) {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addJob.ejs", {
    allMessage,
    user,
  });
});

app.get("/job", authenticated, async function (req, res) {
  const allMessage = await Message.find({ status: "unread" });
  const allJob = await JOB.find();
  const user = req.user;
  res.render("job.ejs", {
    allMessage,
    user,
    allJob,
  });
});

app.post("/partners/deletePartners/:id", authenticated, async (req, res) => {
  const partnersId = req.params.id;
  const thePartners = await Partners.findOne({ _id: partnersId });
  const deletePartners = await Partners.deleteOne({ _id: partnersId });

  if (deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deletePartners,
      },
    });
  }

  if (!deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/job/deleteJob/:id", authenticated, async (req, res) => {
  const partnersId = req.params.id;
  const thePartners = await JOB.findOne({ _id: partnersId });
  const deletePartners = await JOB.deleteOne({ _id: partnersId });

  if (deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deletePartners,
      },
    });
  }

  if (!deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/resturant/deleteResturant/:id", authenticated, async (req, res) => {
  const partnersId = req.params.id;
  const thePartners = await Resturant.findOne({ _id: partnersId });
  const deletePartners = await Resturant.deleteOne({ _id: partnersId });

  if (deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deletePartners,
      },
    });
  }

  if (!deletePartners) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/comment", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Comment.find();
  const user = req.user;
  res.render("allComment.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manageLeave", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const allLeave = await Leave.find({ email: user.email });
  res.render("leave.ejs", {
    allLeave,
    allMessage,
    user,
  });
});

app.get("/allLeave", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const allLeave = await Leave.find();
  res.render("leave.ejs", {
    allLeave,
    allMessage,
    user,
  });
});

app.get("/resource", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Comment.find();
  const user = req.user;
  res.render("resources.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manageRoom", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Room.find();
  const user = req.user;
  res.render("manageRoom.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manageManifestRoom", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const theUser = req.user;
  const comment = await ManifestRoom.find({ hotel: theUser.office });
  const user = req.user;
  res.render("manageManifestRoom.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manageReview", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Review.find();
  const user = req.user;
  res.render("manageReview.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manageBooking", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Booking.find();
  const userss = req.user;

  const allManifestRoom = await ManifestRoom.find({ hotel: userss.office });

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const the = new Date(year, month, day);

  const allBooking = await Booking.find({
    bookingDate: the,
    id: userss.office,
  });
  const user = req.user;

  const standardRoom = await ManifestRoom.find({
    type: "standard room",
    hotel: userss.office,
  });
  const deluxeRoom = await ManifestRoom.find({
    type: "deluxe room",
    hotel: userss.office,
  });
  const executiveRoom = await ManifestRoom.find({
    type: "executive room",
    hotel: userss.office,
  });
  const executiveRoyalRoom = await ManifestRoom.find({
    type: "executive royal room",
    hotel: userss.office,
  });
  const juniorSuiteRoom = await ManifestRoom.find({
    type: "junior suite room",
    hotel: userss.office,
  });
  const classicSuiteRoom = await ManifestRoom.find({
    type: "classic suite room",
    hotel: userss.office,
  });

  res.render("manageBooking.ejs", {
    comment,
    allMessage,
    allManifestRoom,
    user,
    standardRoom,
    allBooking,
    deluxeRoom,
    executiveRoom,
    executiveRoyalRoom,
    juniorSuiteRoom,
    classicSuiteRoom,
  });
});

app.get("/user", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Staff.find().limit(10);
  const user = req.user;
  const totalStaff = (await Staff.find()).length;
  res.render("user.ejs", {
    comment,
    allMessage,
    user, 
    totalStaff: totalStaff
  });
});

app.get("/user/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const partnersId = req.params.id;
  const comment = await Staff.find({ department: partnersId });
  const user = req.user;
  res.render("userid.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/branch/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const partnersId = req.params.id;
  const comment = await Staff.find({ branch: partnersId });
  console.log(comment);
  const user = req.user;
  res.render("branchid.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/department", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Staff.find();
  const user = req.user;
  res.render("department.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/branches", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Staff.find();
  const user = req.user;
  res.render("branches.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/oldManifest", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await User.find();
  const user = req.user;
  res.render("oldManifest.ejs", {
    comment,
    allMessage,
    user,
  });
});

app.get("/manifest", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await User.find();
  const allHotel = await Post.find();
  const user = req.user;
  res.render("manifest.ejs", {
    comment,
    allMessage,
    user,
    allHotel,
  });
});

app.get("/websiteBooking", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const comment = await User.find();
  const allHotel = await Post.find();
  const user = req.user;
  res.render("websiteBooking.ejs", {
    comment,
    allMessage,
    user,
    allHotel,
  });
});

app.get("/restaurant", authenticated, async (req, res) => {
  const user = req.user;

  let hotel;

  if(user.accountType != "branch"){
    hotel = {};
  }

  if(user.accountType == "branch"){
    hotel = await Post.findOne({ _id: user.office });
  }
  
  const allMessage = await Message.find({ status: "unread" });

  let allBooking;

  if(user.accountType != "branch"){
    allBooking = await BookRestaurant.find();
  }

  if(user.accountType == "branch"){
    allBooking = await BookRestaurant.find({ hotel: hotel._id });
  }

  

  res.render("resturantbooking.ejs", {
    user,
    hotel,
    allBooking,
    allMessage
  });

});

app.post("/searchManifest", authenticated, async (req, res) => {
  const { newate } = req.body;
  const userss = req.user;
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Booking.find();
  const allManifestRoom = await ManifestRoom.find({ hotel: userss.office });

  const date = new Date(newate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const the = new Date(year, month, day);

  const allBooking = await Booking.find({
    bookingDate: the,
    id: userss.office,
  });
  const user = req.user;

  const standardRoom = await ManifestRoom.find({
    type: "standard room",
    hotel: userss.office,
  });
  const deluxeRoom = await ManifestRoom.find({
    type: "deluxe room",
    hotel: userss.office,
  });
  const executiveRoom = await ManifestRoom.find({
    type: "executive room",
    hotel: userss.office,
  });
  const executiveRoyalRoom = await ManifestRoom.find({
    type: "executive royal room",
    hotel: userss.office,
  });
  const juniorSuiteRoom = await ManifestRoom.find({
    type: "junior suite room",
    hotel: userss.office,
  });
  const classicSuiteRoom = await ManifestRoom.find({
    type: "classic suite room",
    hotel: userss.office,
  });

  res.render("manageBookings.ejs", {
    allMessage,
    allManifestRoom,
    user,
    standardRoom,
    allBooking,
    deluxeRoom,
    executiveRoom,
    executiveRoyalRoom,
    juniorSuiteRoom,
    classicSuiteRoom,
  });
});

app.post("/addInterview", authenticated, async (req, res) => {
  const { newate, id } = req.body;

  const proffession = await Professions.findOne({ _id: id });

  proffession.interviewDate = newate;

  await proffession.save();
  const USER = process.env;
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: USER.Email,
      pass: USER.Mail_Password,
    },
  });

  let info = await transporter.sendMail({
    from: "preskenrecruiter bookings@preskenhotels.com",
    to: `${proffession.email}`,
    subject: "Thanks you for your Application!!!!",
    html: `
    Your Interview Date is ${newate}
    <br />
    Best Regards
    Presken Hotel and Resorts
    
    `,
  });

  res.redirect("/admin/professional");
});

app.post("/addCbt", authenticated, async (req, res) => {
  const { newate, id } = req.body;

  const proffession = await Professions.findOne({ _id: id });

  proffession.cbtTest = newate;

  await proffession.save();

  res.redirect("/admin/professional");
});

app.get("/reject/:id", authenticated, async (req, res) => {
  const params = req.params;

  const proffession = await Professions.findOne({ _id: params.id });

  await User.deleteOne({ email: proffession.email });
  proffession.status = "Reject";
  await proffession.save();

  res.redirect("/admin/professional");
});

app.get("/mark/:id", authenticated, async (req, res) => {
  const params = req.params;

  const proffession = await Professions.findOne({ _id: params.id });

  const theUser = await User.findOne({ email: proffession.email });
  proffession.status = "Accept";

  theUser.accountType = "employee";

  await proffession.save();
  await theUser.save();

  res.redirect("/admin/professional");
});

app.get("/acceptLeave/:id", authenticated, async (req, res) => {
  const params = req.params;

  const leave = await Leave.findOne({ _id: params.id });

  leave.status = "Approved";

  await leave.save();

  res.redirect("/admin/allLeave");
});

app.get("/rejectLeave/:id", authenticated, async (req, res) => {
  const params = req.params;

  const leave = await Leave.findOne({ _id: params.id });

  leave.status = "Rejected";

  await leave.save();

  res.redirect("/admin/allLeave");
});

app.post("/searchManifests", authenticated, async (req, res) => {
  const { newate, hotelid } = req.body;
  const userss = req.user;
  const allMessage = await Message.find({ status: "unread" });
  const comment = await Booking.find();
  const allManifestRoom = await ManifestRoom.find({ hotel: hotelid });

  const date = new Date(newate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const theHotel = await Post.find({ _id: hotelid });

  const the = new Date(year, month, day);

  const allBooking = await Booking.find({
    bookingDate: the,
    id: hotelid,
  });
  const user = req.user;

  const standardRoom = await ManifestRoom.find({
    type: "standard room",
    hotel: hotelid,
  });
  const deluxeRoom = await ManifestRoom.find({
    type: "deluxe room",
    hotel: hotelid,
  });
  const executiveRoom = await ManifestRoom.find({
    type: "executive room",
    hotel: hotelid,
  });
  const executiveRoyalRoom = await ManifestRoom.find({
    type: "executive royal room",
    hotel: hotelid,
  });
  const juniorSuiteRoom = await ManifestRoom.find({
    type: "junior suite room",
    hotel: hotelid,
  });
  const classicSuiteRoom = await ManifestRoom.find({
    type: "classic suite room",
    hotel: hotelid,
  });

  res.render("manageBookings.ejs", {
    allMessage,
    allManifestRoom,
    user,
    standardRoom,
    allBooking,
    deluxeRoom,
    executiveRoom,
    theHotel,
    newate,
    executiveRoyalRoom,
    juniorSuiteRoom,
    classicSuiteRoom,
  });
});

app.post("/searchBooking", authenticated, async (req, res) => {
  const { newate, hotelid } = req.body;
  const user = req.user;
  const allMessage = await Message.find({ status: "unread" });

  const date = new Date(newate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const the = new Date(year, month, day);

  const theHotel = await Post.findOne({ _id: hotelid });

  const allBooking = await TheBooking.find({ checkIn: newate });

  const allRoom = await Room.find({hotel: theHotel._id});

  res.render("manage.ejs", {
    allMessage,
    user,
    hotelid,
    the,
    allBooking,
    theHotel,
    allRoom,
    newate,
  });
});

app.get("/addComment", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addComment.ejs", {
    allMessage,
    user,
  });
});

app.get("/addLeave", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addLeave.ejs", {
    allMessage,
    user,
  });
});

app.get("/addInterview/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const params = req.params;
  res.render("addInterviewDate.ejs", {
    allMessage,
    user,
    id: params.id,
  });
});

app.get("/addCbt/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const params = req.params;
  res.render("addCbt.ejs", {
    allMessage,
    user,
    id: params.id,
  });
});

app.get("/addBooking/:id/:hotel", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const params = req.params;
  res.render("addBooking.ejs", {
    allMessage,
    serialNumber: params.id,
    hotel: params.hotel,
    user,
  });
});

app.get("/addRoom", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const allHotel = await Post.find();
  const user = req.user;
  res.render("addRoom.ejs", {
    allMessage,
    allHotel,
    user,
  });
});

app.get("/addManifestRoom", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addManifestRoom.ejs", {
    allMessage,
    user,
  });
});

var storageComment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/comment/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload4 = multer({
  storage: storageComment,
});

app.post(
  "/addComment",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const { name, comment, occupation } = req.body;

    const newComment = new Comment({
      name,
      comment,
      occupation,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post("/addLeave", authenticated, async (req, res) => {
  const user = req.user;

  const { leaveType, from, to, reason } = req.body;

  const newComment = new Leave({
    leaveType,
    from,
    to,
    reason,
    email: user.email,
    status: "Pending",
  });

  const saveComment = await newComment.save();

  res.redirect("/admin/manageLeave");
});

app.post(
  "/addUser",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const { email, password, office, role } = req.body;

    const newPassword = await bcrypt.hash(password, 10);

    const newComment = new User({
      email,
      password: newPassword,
      accountType: role,
      office,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addRoom",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const {
      name,
      bedType,
      hotel,
      additionRoom,
      maxUser,
      price,
      discount,
      facilities,
    } = req.body;

    const newComment = new Room({
      name,
      bedType,
      hotel,
      maxUser,
      additionRoom,
      price,
      discount,
      facilities,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addManifestRoom",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const theUser = req.user;

    const { serialNumber, type } = req.body;

    const newComment = new ManifestRoom({
      serialNumber,
      type,
      hotel: theUser.office,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addReview",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const { name, comment, hotel, occupation } = req.body;

    const newComment = new Review({
      name,
      comment,
      occupation,
      hotel,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addBooking",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const {
      serialNumber,
      roomNumber,
      guestName,
      receiptNumber,
      roomRate,
      arrivalDate,
      departureDate,
      pos,
      cash,
      bankTransfer,
      source,
    } = req.body;

    const theUser = req.user;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const theDate = new Date(year, month, day);

    const newComment = new Booking({
      serialNumber,
      roomNumber,
      guestName,
      receiptNumber,
      roomRate,
      arrivalDate,
      departureDate,
      cash,
      pos,
      bankTransfer,
      source,
      id: theUser.office,
      bookingDate: theDate,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addFacilities",
  authenticated,
  upload4.single("imagename"),
  async (req, res) => {
    const { name, comment, hotel } = req.body;

    const newComment = new Facilities({
      name,
      comment,
      hotel,
      picture: JSON.stringify(req.file),
    });

    const saveComment = await newComment.save();

    if (saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveComment,
        },
      });
    }

    if (!saveComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post("/comment/deleteComment/:id", authenticated, async (req, res) => {
  const commentId = req.params.id;
  const theComment = await Comment.findOne({ _id: commentId });
  const deleteComment = await Comment.deleteOne({ _id: commentId });

  if (deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteComment,
      },
    });
  }

  if (!deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/user/deleteUser/:id", authenticated, async (req, res) => {
  const commentId = req.params.id;
  const theComment = await User.findOne({ _id: commentId });
  const deleteComment = await User.deleteOne({ _id: commentId });

  if (deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteComment,
      },
    });
  }

  if (!deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/room/deleteRoom/:id", authenticated, async (req, res) => {
  const commentId = req.params.id;
  const theComment = await Room.findOne({ _id: commentId });
  const deleteComment = await Room.deleteOne({ _id: commentId });

  if (deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteComment,
      },
    });
  }

  if (!deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post(
  "/manageManifestRoom/deleteManifestRoom/:id",
  authenticated,
  async (req, res) => {
    const commentId = req.params.id;
    const deleteComment = await ManifestRoom.deleteOne({ _id: commentId });

    if (deleteComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          deleteComment,
        },
      });
    }

    if (!deleteComment) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post("/review/deleteReview/:id", authenticated, async (req, res) => {
  const commentId = req.params.id;
  const theComment = await Review.findOne({ _id: commentId });
  const deleteComment = await Review.deleteOne({ _id: commentId });

  if (deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteComment,
      },
    });
  }

  if (!deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/booking/deleteBooking/:id", authenticated, async (req, res) => {
  const commentId = req.params.id;
  const theComment = await Booking.findOne({ _id: commentId });
  const deleteComment = await Booking.deleteOne({ _id: commentId });

  if (deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteComment,
      },
    });
  }

  if (!deleteComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/message", authenticated, async (req, res) => {
  const all = await Message.find({ status: "unread" });
  const user = req.user;
  let allMessage;

  if (user.email != "cybercode2000@gmail.com" && user.email != "contact@preskenhotels.com") {
    allMessage = await Message.find({ hotel: user.office });
  } else {
    allMessage = await Message.find();
  }
  res.render("message.ejs", {
    allMessage,
    all,
    user,
  });
});

app.get("/form", authenticated, async (req, res) => {
  const all = await Message.find({ status: "unread" });
  const allForm = await AllForm.find();
  const allMessage = await Message.find();
  const user = req.user;
  res.render("form-reg.ejs", {
    allForm,
    user,
    all,
    allMessage,
  });
});

app.get("/professional", authenticated, async (req, res) => {
  const all = await Message.find({ status: "unread" });
  const allForm = await Professions.find();
  const allMessage = await Message.find();
  const user = req.user;
  res.render("professions.ejs", {
    allForm,
    all,
    allMessage,
    user,
  });
});

app.post("/message/deleteMessage/:id", authenticated, async (req, res) => {
  const messageId = req.params.id;
  const deleteMessage = await Message.deleteOne({ _id: messageId });

  if (deleteMessage) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteMessage,
      },
    });
  }

  if (!deleteMessage) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/message/readMessage/:id", authenticated, async (req, res) => {
  const messageId = req.params.id;
  const theMessage = await Message.findOne({ _id: messageId });

  if (theMessage) {
    theMessage.status = "read";
    const saveMessage = await theMessage.save();
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveMessage,
      },
    });
  }

  if (!theMessage) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/deleteProject/:id", authenticated, async (req, res) => {
  const projectId = req.params.id;
  const theProject = await Project.findOne({ _id: projectId });
  const deleteProject = await Project.deleteOne({ _id: projectId });

  if (deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteProject,
      },
    });
  }

  if (!deleteProject) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/addProject", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addProject.ejs", {
    allMessage,
    user,
  });
});

app.get("/addUser", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  const hotel = await Post.find();
  res.render("addUser.ejs", {
    allMessage,
    user,
    hotel,
  });
});

app.get("/viewproject/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const project = await Project.findOne({ _id: req.params.id });
  const user = req.user;
  res.render("viewProject.ejs", {
    allMessage,
    project,
    user,
  });
});

app.get("/project", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const allProject = await Project.find();
  const user = req.user;
  res.render("project.ejs", {
    allProject,
    allMessage,
    user,
  });
});

var storageProject = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/project/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload6 = multer({
  storage: storageProject,
});

app.post(
  "/addProject",
  authenticated,
  upload6.single("file"),
  async (req, res) => {
    const { name, note } = req.body;

    const newProject = new Project({
      projectName: name,
      projectDate: new Date(),
      projectNote: note,
      projectPicture: JSON.stringify(req.file),
      comment: [],
    });

    const saveProject = await newProject.save();
    if (saveProject) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveProject,
        },
      });
    }

    if (!saveProject) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post(
  "/addCourse",
  authenticated,
  upload6.single("file"),
  async (req, res) => {
    const { name, post } = req.body;

    const newProject = new Volunteer({
      name,
      volunteerPicture: JSON.stringify(req.file),
      position: post,
    });

    const saveProject = await newProject.save();
    if (saveProject) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveProject,
        },
      });
    }

    if (!saveProject) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.get("/gallery", authenticated, async (req, res) => {
  const gallery = await Gallery.find();
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("gallery.ejs", {
    gallery,
    allMessage,
    user,
  });
});

app.get("/addGallery", authenticated, async (req, res) => {
  const gallery = await Gallery.find();
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addGallery.ejs", {
    gallery,
    allMessage,
    user,
  });
});

var storageGallery = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/gallery/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var uploadGallery = multer({
  storage: storageGallery,
});

app.post(
  "/addGallery",
  authenticated,
  uploadGallery.single("picture"),
  async (req, res) => {
    const { description, picture } = req.body;
    const newGallery = new Gallery({
      description,
      picture: JSON.stringify(req.file),
      date: new Date(),
    });

    const saveGallery = await newGallery.save();
    if (saveGallery) {
      res.redirect("/admin/addGallery");
    }
  }
);

app.post("/gallery/deleteGallery/:id", authenticated, async (req, res) => {
  const pictureId = req.params.id;
  const thePicture = await Gallery.deleteOne({ _id: pictureId });

  res.redirect("/admin/gallery");
});

app.get("/profile", authenticated, async (req, res) => {
  const db = await Setting.find();
  const allMessage = await Message.find({ status: "unread" });
  const setting = db[0];
  const user = req.user;
  res.render("profile.ejs", {
    setting,
    allMessage,
    user,
  });
});

app.post("/profile", authenticated, async (req, res) => {
  const db = await Setting.find();
  const setting = db[0];

  const { companyName, companyCaption, videoLink, vision } = req.body;
  setting.companyName = companyName;
  setting.companyCaption = companyCaption;
  setting.videoLink = videoLink;

  const saveSocial = await setting.save();

  if (saveSocial) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveSocial,
      },
    });
  }
});

app.get("/social", authenticated, async (req, res) => {
  const db = await Setting.find();
  const allMessage = await Message.find({ status: "unread" });
  const setting = db[0];
  const user = req.user;
  res.render("editProfile.ejs", {
    setting,
    allMessage,
    user,
  });
});

app.post("/social", authenticated, async (req, res) => {
  const db = await Setting.find();

  const setting = db[0];

  const { facebook, twitter, instagram, email, whatsapp } = req.body;
  setting.facebook = facebook;
  setting.twitter = twitter;
  setting.instagram = instagram;
  setting.email = email;
  setting.whatsapp = whatsapp;

  const saveSocial = await setting.save();

  if (saveSocial) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveSocial,
      },
    });
  }
});

app.get("/information", authenticated, async (req, res) => {
  const db = await Setting.find();
  const allMessage = await Message.find({ status: "unread" });
  const setting = db[0];
  const user = req.user;
  res.render("counter.ejs", {
    setting,
    allMessage,
    user,
  });
});

app.post("/information", authenticated, async (req, res) => {
  const db = await Setting.find();
  const setting = db[0];

  const {
    vision,
    mission,
    about,
    projectCounter,
    volunteerCounter,
    donorCounter,
  } = req.body;
  setting.vision = vision;
  setting.mission = mission;
  setting.about = about;
  setting.projectCounter = projectCounter;
  setting.donorCounter = donorCounter;
  setting.volunteerCounter = volunteerCounter;

  const saveSocial = await setting.save();

  if (saveSocial) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveSocial,
      },
    });
  }
});

app.get("/password", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("password.ejs", {
    allMessage,
    user,
  });
});

app.post("/changePassword", authenticated, async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;
  const User = await user.findOne({ _id: id });

  const userPassword = User.password;

  const check = await bcrypt.compare(oldPassword, userPassword);

  if (check) {
    User.password = await bcrypt.hash(newPassword, 10);

    const saveUser = await User.save();

    if (saveUser) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: 200,
          saveUser,
        },
      });
    }
    if (!saveUser) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: 400,
        },
      });
    }
  }
  if (!check) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: 400,
      },
    });
  }
});

app.post("/deletePostPicture/:id", authenticated, async (req, res) => {
  const pictureId = req.params.id;
  const deletePicture = await PostPicture.deleteOne({ _id: pictureId });

  if (deletePicture) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
      },
    });
  }

  if (!deletePicture) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/addPost", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addPost.ejs", {
    allMessage,
    user,
  });
});

app.get("/addFacilities", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const allHotel = await Post.find();
  const user = req.user;
  res.render("addFacilities.ejs", {
    allMessage,
    allHotel,
    user,
  });
});

var storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/post/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload8 = multer({
  storage: storagePost,
});

app.post(
  "/postPicture",
  authenticated,
  upload8.single("file"),
  async (req, res) => {
    const { date } = req.body;

    const newPost = new PostPicture({
      date,
      postPicture: JSON.stringify(req.file),
    });

    const saveGallery = await newPost.save();
    if (saveGallery) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "200",
          saveGallery,
        },
      });
    }

    if (!saveGallery) {
      httpMsgs.sendJSON(req, res, {
        from: {
          status: "500",
        },
      });
    }
  }
);

app.post("/addPost", authenticated, async (req, res) => {
  const { note, title, date, description } = req.body;

  const newPost = new Post({
    postName: title,
    description: description,
    postDate: date,
    postNote: note,
    likes: 0,
    comment: [],
  });

  const savePost = await newPost.save();
  if (savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        savePost,
      },
    });
  }

  if (!savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/addEvent", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("addEvent.ejs", {
    allMessage,
    user,
  });
});

app.post("/addEvent", authenticated, async (req, res) => {
  const { note, title, date, description } = req.body;

  const newPost = new damilare({
    eventName: title,
    eventDate: date,
    eventNote: JSON.stringify(note),
    description: description,
    likes: 0,
    comment: [],
  });

  const savePost = await newPost.save();
  if (savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        savePost,
      },
    });
  }

  if (!savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/addHotel", authenticated, async (req, res) => {
  const {
    name,
    mapLink,
    address,
    phone1,
    phone2,
    email,
    policies,
    description,
    date,
  } = req.body;

  const newPost = new Post({
    name,
    mapLink,
    policies,
    address,
    phone1,
    phone2,
    email,
    description,
    date,
  });

  const savePost = await newPost.save();
  if (savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        savePost,
      },
    });
  }

  if (!savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/event", authenticated, async (req, res) => {
  const event = await damilare.find();
  const allMessage = await Message.find({ status: "unread" });
  const postPicture = await PostPicture.find();
  const user = req.user;
  res.render("event.ejs", {
    event,
    user,
    postPicture,
    allMessage,
  });
});

app.get("/manageHotel", authenticated, async (req, res) => {
  const event = await Post.find();
  const allMessage = await Message.find({ status: "unread" });
  const postPicture = await PostPicture.find();
  const user = req.user;
  res.render("manageHotel.ejs", {
    event,
    postPicture,
    allMessage,
    user,
  });
});

app.get("/manageFacilities", authenticated, async (req, res) => {
  const event = await Facilities.find();
  const allMessage = await Message.find({ status: "unread" });
  const postPicture = await PostPicture.find();
  const user = req.user;
  res.render("manageFacilities.ejs", {
    event,
    postPicture,
    allMessage,
    user,
  });
});

app.get("/event/view/:id", authenticated, async (req, res) => {
  const event = await damilare.findOne({ _id: req.params.id });
  const allMessage = await Message.find({ status: "unread" });
  const postPicture = await PostPicture.find({ date: event.eventDate });
  const user = req.user;
  res.render("viewEvent.ejs", {
    event,
    postPicture,
    allMessage,
    user,
  });
});

app.get("/post/view/:id", authenticated, async (req, res) => {
  const event = await Post.findOne({ _id: req.params.id });
  const allMessage = await Message.find({ status: "unread" });
  const postPicture = await PostPicture.find({ date: event.postDate });
  const user = req.user;
  res.render("viewPost.ejs", {
    event,
    postPicture,
    allMessage,
    user,
  });
});

app.post("/deleteEvent/:id", authenticated, async (req, res) => {
  const eventId = req.params.id;
  const deleteEvent = await damilare.deleteOne({ _id: eventId });

  if (deleteEvent) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteEvent,
      },
    });
  }

  if (!deleteEvent) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.post("/deleteHotel/:id", authenticated, async (req, res) => {
  const eventId = req.params.id;
  const deleteEvent = await Post.deleteOne({ _id: eventId });

  if (deleteEvent) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deleteEvent,
      },
    });
  }

  if (!deleteEvent) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/post", authenticated, async (req, res) => {
  const post = await Post.find();
  const postPicture = await PostPicture.find();
  const allMessage = await Message.find({ status: "unread" });
  const user = req.user;
  res.render("post.ejs", {
    post,
    postPicture,
    allMessage,
    user,
  });
});

app.post("/deletePost/:id", authenticated, async (req, res) => {
  const postId = req.params.id;
  const deletePost = await Post.deleteOne({ _id: postId });

  if (deletePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        deletePost,
      },
    });
  }

  if (!deletePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

app.get("/logo", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const logo = await Logo.find();
  const realLogo = logo[0];
  const user = req.user;
  res.render("logo.ejs", {
    allMessage,
    user,
    realLogo,
  });
});

var storageLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/logo/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload10 = multer({
  storage: storageLogo,
});

app.post("/logo", authenticated, upload10.single("file"), async (req, res) => {
  const logo = await Logo.find();
  const realLogo = logo[0];
  realLogo.logo = JSON.stringify(req.file);
  const logoSave = await realLogo.save();

  if (logoSave) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
      },
    });
  }
});

app.get("/event/edit/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const event = await damilare.findOne({ _id: req.params.id });
  const postPicture = await PostPicture.find({ date: event.eventDate });
  const user = req.user;
  res.render("editEvent.ejs", {
    allMessage,
    event,
    user,
    postPicture,
  });
});

app.get("/post/edit/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const event = await Post.findOne({ _id: req.params.id });
  const postPicture = await PostPicture.find({ date: event.postDate });
  const user = req.user;
  res.render("editPost.ejs", {
    allMessage,
    event,
    user,
    postPicture,
  });
});

app.get("/message/:id", authenticated, async (req, res) => {
  const allMessage = await Message.find({ status: "unread" });
  const message = await Message.findOne({ _id: req.params.id });
  const user = req.user;
  res.render("viewMessage.ejs", {
    allMessage,
    message,
    user,
  });
});

app.post("/editEvent/:id", authenticated, async (req, res) => {
  const { note, title, link, location, date } = req.body;
  const theEvent = await damilare.findOne({ _id: req.params.id });

  theEvent.eventName = title;
  theEvent.eventDate = date;
  theEvent.eventNote = note;
  theEvent.eventLocation = location;
  theEvent.eventLink = link;

  let savePost = await theEvent.save();

  if (savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        savePost,
      },
    });
  }

  if (!savePost) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "500",
      },
    });
  }
});

function authenticated(req, res, next) {
  //declaring and initializing the error variable as empty array

  const error = [];

  // the conditional statement that check for it

  if (req.isAuthenticated()) {
    next();
  } else {
    error.push({ msg: "please you need to login first" });
    res.redirect("/login");
  }
}

module.exports = app;
