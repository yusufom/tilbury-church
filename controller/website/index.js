const Post = require("../../models/post");
const postPicture = require("../../models/postPicture");


exports.getIndex = async (req,res) => {
  const event = await Post.find().limit(3);  
  const PostPictures = await postPicture.find();

  res.render("index.ejs", {
    event,
    postPicture: PostPictures
  });
}

