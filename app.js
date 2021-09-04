//jshint esversion:6


// Initializing the GUNS!!!
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Load the full build.
const _ = require('lodash');


// Random Text
const homeStartingContent = "Hello, this is a fully functioning blog post site that runs on HTML/CSS/JavaScript/EJS/MongoDB. Add /compose to the URL and you will be taken to a different page where you can create these blogs.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// MORE GUNS!!
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB
const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

let posts = [];



// Grabbing our static files 
app.use(express.static(__dirname + "/public"));

// Grabbing the home page
app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", { startingContent: homeStartingContent, posts: posts });
  })
});

// Grabbing the about page
app.get('/about', function (req, res) {
  res.render("about", { about: aboutContent });
})

// Grabbing the contact page
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent })
});

// Grabbing the compose page
app.get("/compose", function (req, res) {
  res.render("compose")
});

// When someone posts something on the compose.ejs
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.message
  })
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});





