const express = require("express");
const router = express.Router();
const passport = require("passport");
const Gallery = require("../models/gallery");
const Setting = require("../models/Setting");
const damilare = require("../models/realEvent");
const Images = require("../models/postPicture");
const Project = require("../models/project");
const Comment = require("../models/comment");
const Volunteer = require("../models/volunteer");
const Message = require("../models/message");
const httpMsgs = require("http-msgs");
const newForm = require("../models/form");
const nodemailer = require("nodemailer");
const JOB = require("../models/job");
const multer = require("multer");
const Facilities = require("../models/facilities");
const Post = require("../models/post");
const Room = require("../models/room");
const Professions = require("../models/professions");
const Review = require("../models/review");
const Partners = require("../models/partners");
const Resturant = require("../models/resturant");
const Book = require("../models/book");
const TheBooking = require("../models/books");
const AcceptResturant = require("../models/bookresturant");

const BookingResult = require("../models/bookingresult");
const GuestRegistration = require("../models/GuestRegistration.js");


const bcrypt = require("bcryptjs");
const Us = require("../models/User");

const accountSid = "ACf4ad62ea00319ba93b069facaacead86";
const authToken = "901879500af8dda426f10dad2dcc32bb";
const client = require("twilio")(accountSid, authToken);



router.get("/getAllHotel", async (req, res) => {
  const id = req.params.id;
  const allNews = await Post.find();
  const image = await Images.find();
  res.json({
    statusCode: 200,
    statusMessage: "Successfully",
    update: allNews,
    mainImage: image
  })
})

router.get("/login", notauthenticated, async (req, res) => {
  res.render("login.ejs");
});

router.get("/gallery", async (req, res) => {
  const allImage = await Partners.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("FrontGallery.ejs", {
    allImage,
    setting,
  });
});

router.get("/order/:id", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params;
  const allResturant = await Resturant.findOne({ _id: id.id });
  const allHotel = await Post.find();
  const image = await Images.find();

  res.render("order.ejs", {
    setting: setting[0],
    image,
    allHotel,
    allResturant,
  });
});

router.get("/ikeja", async (req, res) => {
  const allNews = await Post.find();

  const newUpdate = [];
  allNews.forEach((the) => {
    if (
      the.name == "Presken Hotel and Resorts MOJIDI" ||
      the.name == "Presken Hotel @ Awolowo way" ||
      the.name == "Presken Hotels @Alade Avenue" ||
      the.name == "PRESKEN HOTEL @ K-ONE PLACE" ||
      the.name == "Presken Hotel @ G.R.A, Ikeja" ||
      the.name == "Presken Hotels @ Maryland, Ikeja" ||
      the.name == "PRESKEN HOTELS OPEBI LAGOS" ||
      the.name == "Presken Hotel (Reliance)" ||
      the.name == "PRESKEN RESIDENCE @ G.R.A, LAGOS" ||
      the.name == "PRESKEN RESIDENCE ANNEX, G.R.A. IKEJA" ||
      the.name == "Presken Castle" ||
      the.name == "Presken Hotels @ Maryland, Ikeja."
    ) {
      newUpdate.push(the);
    }
  });
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("loc.ejs", {
    allNews: newUpdate,
    image,
    title: "Ikeja, Lagos",
    setting,
  });
});

router.get("/abuja", async (req, res) => {
  const allNews = await Post.find({ name: "Presken Hotels @ Abuja" });
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("loc.ejs", {
    allNews,
    image,
    setting,
    title: "Abuja, Nigeria",
  });
});

router.get("/island", async (req, res) => {
  const allNews = await Post.find();
  const newUpdate = [];
  allNews.forEach((the) => {
    if (
      the.name == "PRESKEN HOTELS @ VICTORIA ISLAND" ||
      the.name == "Presken Hotel @Oniru" ||
      the.name == "Presken Hotels @ Freedom Way, Lekki" ||
      the.name == "PRESKEN @ BANANA ISLAND"
    ) {
      newUpdate.push(the);
    }
  });
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("loc.ejs", {
    allNews: newUpdate,
    image,
    title: "Lagos Island",
    setting,
  });
});

router.get("/airport", async (req, res) => {
  const allNews = await Post.find({
    name: " Presken Hotel @ International Airport Road",
  });
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("loc.ejs", {
    allNews,
    image,
    title: "International Aiport Road",
    setting,
  });
});

router.get("/blog", async (req, res) => {
  const allNews = await damilare.find();
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("blog.ejs", {
    allNews,
    setting,
    image,
  });
});

router.get("/hotel", async (req, res) => {
  const allNews = await Post.find();
  const image = await Images.find();
  const db = await Setting.find();
  const setting = db[0];
  res.render("hotel.ejs", {
    allNews,
    image,
    setting,
  });
});



router.post("/messages", async (req, res) => {
  const { name, email, id, comments } = req.body;
  const newMessage = new Message({
    name,
    email,
    date: new Date(),
    title: "new Message",
    message: comments,
    status: "unread",
    hotel: id,
  });

  const saveComment = await newMessage.save();

  if (saveComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveComment,
      },
    });
  }
});

router.post("/roomBooking/:id", async (req, res) => {
  const { checkIn, checkOut, user, room } = req.body;

  const params = req.params;
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);

  var Difference_In_Time = date2.getTime() - date1.getTime();

  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  const dates_in = [];

  for (let i = 0; i <= Difference_In_Days; i++) {
    function addDays(date, days) {
      const copy = new Date(Number(date));
      copy.setDate(date.getDate() + days);
      return copy;
    }

    const date = new Date(date1);
    const newDate = addDays(date, i);

    dates_in.push(newDate);
  }

  const theRoom = await Room.findOne({ _id: params.id });

  const allBook = await Book.find();

  let available = [];

  for (let i = 0; i <= dates_in.length; i++) {
    const found = allBook.filter((a) => {
      a.date == dates_in[i];
    });

    if (Number(found.length) + Number(room) >= Number(theRoom.maxUser)) {
      available.push(1);
    } else {
      available.push(0);
    }
  }

  function checking(num) {
    return Number(num) == 0;
  }

  let check = available.find(checking);

  console.log(check);

  if (check == 0) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
      },
    });
  } else {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
      },
    });
  }
});

router.post("/bookUser/:id", async (req, res) => {
  const params = req.params;

  const {
    checkIn,
    checkOut,
    user,
    room,
    surname,
    firstName,
    homeAddress,
    userEmail,
    phone,
    company,
    country,
    state,
  } = req.body;

  const dates = new Date();
  const day = dates.getDate();
  const month = dates.getMonth();
  const year = dates.getFullYear();

  const the = new Date(year, month, day);

  const realBooking = new TheBooking({
    checkIn,
    checkOut,
    user,
    room,
    surname,
    firstName,
    homeAddress,
    userEmail,
    phone,
    company,
    country,
    state,
    bookingDate: the,
    roomId: params.id,
  });
  

  const findRoom = await Room.findOne({ _id: params.id });
  const findHotel = await Post.findOne({ _id: findRoom.hotel });

  const save = await realBooking.save();

  const d = new Date();
  const ids = d.getTime();   
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
      from: "Presken bookings@preskenhotels.com",
      to: `${userEmail}`,
      subject: "Thanks for your reservation!!!!",
      html: `Dear ${surname} ${firstName}. <br /> Thank you for your reservation your reservation code is - ${ids}, 
      <br />
      Reservation Details  <br />
      Check In Date - ${ checkIn }  <br />
      Check Out Date - ${ checkOut } <br />
      Guest Name - ${ surname } ${ firstName } <br />
      Booking Date - ${ the } <br />
      Hotel Name - ${findHotel.name} <br />
      Hotel address - ${findHotel.address} <br />
      Branch Phone Number - ${findHotel.phone1} <br />
      Alternative Branch Phone Number - ${findHotel.phone2} <br />
      Room Name - ${findRoom.name} <br />
      Total Room Booked - ${room} <br />
      Price - ${Number(room) * Number(findRoom.price)} <br />
      <br />
      N:B - All payments should be made to only Presken official Account
      <br/>
      Best Regards,
      Presken Hotel and Resorts
    `,
    });

    const userDataNew = BookingResult({
      surname,
      firstName,
      ids,
      checkIn,
      checkOut,
      the,
      hotelName: findHotel.name,
      address: findHotel.address,
      phone1: findHotel.phone1,
      phone2: findHotel.phone2,
      RoomName: findRoom.name,
      totalRoomNumber: room,
      roomPrice: room * Number(findRoom.price)
    })

    const saveNa = await userDataNew.save()

    transporter.sendMail(info, (err) => {
      if (err) {
        console.log("error");
      } else {

        httpMsgs.sendJSON(req, res, {
          from: {
            status: saveNa._id,
          },
        })
        res.redirect(`result/${saveNa._id}`);
      }
    })
});

router.get("/result/:id", async (req, res) => {
const setting = await Setting.find();
const findData = await BookingResult.findOne({ _id: req.params.id });
  res.render('result', {
    setting: setting[0],
    findData
  });
});

router.get("/result", async (req, res) => {
const setting = await Setting.find();
const findData = await TheBooking.find();
  res.send(findData)
});

router.get("/guestregistration", async (req, res) => {
const setting = await Setting.find();
  res.render('guestRegistration', {
    setting: setting[0],
  });
});


router.post('/guest', async (req,res) => {
  const { txtDate, txtDate2, surname, firstName, branchName,  homeAddress, userEmail, phone, company, country, state, platform } = req.body ;
const setting = await Setting.find();
  const guestReg = new GuestRegistration({
    txtDate, 
    txtDate2, 
    surname, 
    firstName, 
    branchName,  
    homeAddress, 
    userEmail, 
    phone, 
    company, 
    country, 
    state, 
    platform
  })

  await guestReg.save();

  res.render('checkedin', {
    setting: setting[0],
  });

})



router.post("/order/:id", async (req, res) => {
  const params = req.params;

  const {
    surname,
    firstName,
    homeAddress,
    hotel,
    userEmail,
    phone,
    country,
    plate,
    state,
    city,
  } = req.body;

  const realBooking = new AcceptResturant({
    surname,
    firstName,
    homeAddress,
    hotel,
    userEmail,
    phone,
    country,
    plate,
    state,
    city,
    date: new Date(),
    roomId: params.id,
  });

  await realBooking.save();

    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
      },
    });
});

router.post("/form-adding", async (req, res) => {
  const {
    name,
    phone,
    state,
    email,
    occupation,
    bussinessType,
    location,
    about,
  } = req.body;

  const newMessage = new newForm({
    name,
    phone,
    state,
    email,
    occupation,
    bussinessType,
    location,
    about,
  });

  const saveComment = await newMessage.save();

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
    from: "Aservices bookings@preskenhotels.com",
    to: `${email}`,
    subject: "Thanks you for your Registration!!!!",
    html: `Thanks for your registration on A Service Website for our Coming event - Future of Works. We Will keep update you via this email
    


    <br />
    Best Regards
    
    `,
  });

  transporter.sendMail(info, (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("sent");
    }
  });

  const newPassword = await bcrypt.hash(`${phone}`, 10);

  const newComment = new Us({
    email,
    password: newPassword,
    accountType: "applicant",
    picture: "",
  });

  await newComment.save();

  if (saveComment) {
    httpMsgs.sendJSON(req, res, {
      from: {
        status: "200",
        saveComment,
      },
    });
  }
});

router.post(
  "/login",
  notauthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/service", async (req, res) => {
  const setting = await Setting.find();
  const project = await Project.find();
  res.render("service.ejs", {
    setting: setting[0],
    project,
  });
});

router.get("/career", async (req, res) => {
  const setting = await Setting.find();
  const allJob = await JOB.find();
  res.render("career.ejs", {
    setting: setting[0],
    allJob,
  });
});

router.get("/job/:id", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params.id;
  const job = await JOB.findOne({ _id: id });
  res.render("careerdetails.ejs", {
    setting: setting[0],
    job,
  });
});

router.get("/servicedetails/:id", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params.id;
  const project = await Project.findOne({ _id: id });
  if (project) {
    res.render("servicedetails.ejs", {
      setting: setting[0],
      project,
    });
  } else {
    res.redirect("/error404");
  }
});

router.get("/blogdetails/:id", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params.id;
  const News = await damilare.findOne({ eventName: id });
  const image = await Images.find();
  if (News) {
    res.render("blogdetails.ejs", {
      setting: setting[0],
      News,
      image,
    });
  } else {
    res.redirect("/error404");
  }
});

router.get("/hotel/:id", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params.id;
  const News = await Post.findOne({ name: id });
  const allRoom = await Room.find({ hotel: News._id });
  const image = await Images.find();
  const allComment = await Review.find({ hotel: News._id });
  const allFacilities = await Facilities.find({ hotel: News._id });

    res.render("hotelDetails.ejs", {
      setting: setting[0],
      News,
      image,
      allFacilities,
      allRoom,
      allComment,
    });
});

router.get("/book1/:id/:hotel", async (req, res) => {
  const setting = await Setting.find();
  const id = req.params;
  const News = await Post.findOne({ _id: id.hotel });
  const allRoom = await Room.findOne({ _id: id.id });
  const image = await Images.find();

  res.render("book.ejs", {
    setting: setting[0],
    News,
    image,
    allRoom,
  });
});

router.get("/team", async (req, res) => {
  const setting = await Setting.find();
  const team = await Volunteer.find();
  res.render("team.ejs", {
    setting: setting[0],
    team,
  });
});

router.get("/form/future-of-work", async (req, res) => {
  const setting = await Setting.find();
  res.render("form.ejs", {
    setting: setting[0],
  });
});

router.get("/resturant", async (req, res) => {
  // const setting = await Setting.find();
  // const resturant = await Resturant.find();
  // res.render("ourresturant.ejs", {
  //   setting: setting[0],
  //   resturant,
  // });
  res.redirect("/menu/foodmenu.pdf");
});


router.get("/staffregistration", async (req, res) => {
  const setting = await Setting.find();
  res.render("staff.ejs", {
    setting: setting[0],
  });
});

var storageProfessions = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload4 = multer({
  storage: storageProfessions,
});

router.post("/professionals", upload4.fields([
  { name: "passport", maxCount: 1 },
  { name: "image", maxCount: 1 },]), async (req, res) => {
  const { name, phone, email, job } = req.body;

  const theFile = req.files;
  const newProfessions = new Professions({
    name,
    phone,
    email,
    phone,
    job,
    date: new Date(),
    passport: JSON.stringify(theFile.passport),
    image: JSON.stringify(theFile.image),
  });

  const saveComment = await newProfessions.save();

  const USER = process.env;
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    auth: {
      user: USER.Email,
      pass: USER.Mail_Password,
    },
  });

  let info = await transporter.sendMail({
    from: "preskenrecruiter bookings@preskenhotels.com",
    to: `${email}`,
    subject: "Thanks for your Application!!!!",
    html: `Thank you for applying for job on presken hotel and resorts. Kindly login to your portal using @ https://preskenhotels.com/login using your email and phone number as a password
    <br />
    <br />
    Best Regards
    <br />
    Human Resource
    <br />
    Presken Hotel and Resorts
    
    `,
  });

  const newPassword = await bcrypt.hash(`${phone}`, 10);

  const newComment = new Us({
    email,
    password: newPassword,
    accountType: "applicant",
    picture: "",
  });

  await newComment.save();

  transporter.sendMail(info, (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("sent");
    }
  });

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
});
function notauthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  }
  next();
}

module.exports = router;
