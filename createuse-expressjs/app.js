const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const userModel = require('./module/user');

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render('read', { users });
});

app.get("/delete/:id", async (req, res) => {
  let userId = req.params.id;
  await userModel.findByIdAndDelete(userId);
  res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findById(req.params.userid);
  res.render("edit", { user });
});

app.post("/update/:userid", async (req, res) => {
  let { name, email, password, imageUrl } = req.body;
  let user = await userModel.findByIdAndUpdate(req.params.userid, { name, email, password, imageUrl }, { new: true });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, password, imageUrl } = req.body;
  let createdUser = await userModel.create({
    name: name,
    email: email,
    password: password,
    imageUrl: imageUrl // Added imageUrl field
  });
  res.redirect("/read");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
