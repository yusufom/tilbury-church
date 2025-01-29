// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const httpMsgs = require("http-msgs");
// const MobileAppUser = require("../models/mobileAppUser");
// const bcrypt = require('bcryptjs');

// const Post = require("../models/post");
// const Images = require("../models/postPicture");

// const sessionStorage = require('sessionstorage');

// router.post("/register", async (req, res) => {
//   const { email, password, fullName, phoneNumber } = req.body;
//   const newPassword = await bcrypt.hash(password, 10);

//   const checkMail = await MobileAppUser.findOne({ email: email });

//   if(!checkMail){
//     const newUser = new MobileAppUser({
//       email,
//       password: newPassword,
//       fullName,
//       phoneNumber,
//       dateCreated: new Date()
//     });
  
//     const save = await newUser.save();
  
//     if (save) {
//       res.json({
//           statusCode: 200,
//           message: "User registration successfully"
//       })
//     }
//     if (!save) {
//       res.send('something occur')
//     }
//   }else {
//     res.json({
//           statusCode: 400,
//           message: "Email already exist"
//       })
//   }
// });


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     const findUser = await MobileAppUser.findOne({ email: email });

//     if(!findUser){
//         res.json({
//             statusCode: 400,
//             statusMessage: "Email and password does not match"
//         })
//     }
//     else {
//         bcrypt.compare(password, findUser.password, (err, isMatch) => {
//             if (err) throw err;

//             if (isMatch) {  
//                 sessionStorage.setItem("user", findUser.email);

//                 res.json({
//                     statusCode: 200,
//                     statusMessage: "Login Successfully"
//                 })


//             } else {
//                 res.json({
//                     statusCode: 400,
//                     statusMessage: "Email and password does not match"
//                 })
//             }
//           });
//     }
// });


// router.get("/hotel", async (req, res) => {
//   const allNews = await Post.find();
//   const image = await Images.find();
  
//   res.json({
//     allNews,
//     image
//   })
// });

// module.exports = router;
