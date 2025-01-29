const Setting = require("../../models/Setting");
const Volunteer = require("../../models/volunteer");
const Comment = require("../../models/comment");


exports.getAbout = async (req, res) => {
  res.render("about.ejs");
}