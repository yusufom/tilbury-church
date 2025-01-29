const express = require("express");
const Setting = require("../../models/Setting");

exports.getContact = async (req, res) => {
  res.render("contact.ejs");
}

exports.postContact =  async (req, res) => {
  // const { name, email, comments, phone } = req.body;
   
  //   const newMessage = new Message({
  //   name,
  //   email,
  //   phone,
  //   date: new Date(),
  //   title: "new Message",
  //   message: comments,
  //   status: "unread",
  // });

  // const saveComment = await newMessage.save();

  // if (saveComment) {
  //   httpMsgs.sendJSON(req, res, {
  //     from: {
  //       status: "200",
  //       saveComment,
  //     },
  //   });
  // }
};