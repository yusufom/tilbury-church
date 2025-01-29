const express = require("express");
const router = express.Router();
const multer = require("multer");
const httpMsgs = require("http-msgs");
const Staff = require("../models/staff");


router.post("/staffregistration", async (req, res) => {
  
  const checkMail = await Staff.findOne({ emailAddress: req.body.emailAddress });

  if(!checkMail){
    const newStaff = new Staff({
      surname: req.body.surname, 
      firstName: req.body.firstName, 
      NOKphone: req.body.NOKphone, 
      employement: req.body.employement, 
      lastName: req.body.lastName, 
      homeAddress: req.body.homeAddress, 
      phoneNumber: req.body.phoneNumber, 
      secondPhone: req.body.secondPhone, 
      sex: req.body.sex, 
      maritalStatus: req.body.maritalStatus, 
      qualification: req.body.qualification, 
      department: req.body.department, 
      branch: req.body.branch, 
      dob: req.body.dob, 
      emailAddress: req.body.emailAddress, 
      nin: req.body.nin, 
      NOK: req.body.NOK, 
      NOKAddress: req.body.NOKAddress, 
      relationship: req.body.relationship,
      bankName: req.body.bankName,
      accountName: req.body.accountName,
      AccountNumber: req.body.AccountNumber, 
      file: req.body.file
    });
  
  
    const save = await newStaff.save();
  
    if (save) {
      res.send("successfully")
    }
  
    if (!save) {
      res.send('something occur')
    }
  }else {
    res.send('Details already exist')
  }
});


module.exports = router;
