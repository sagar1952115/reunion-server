const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Auth = require("./routes/Auth.js");
const User = require("./routes/User.js");
const Post = require("./routes/Post");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DATABASE)
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get("/", (req, res) => {
  res.send("App is running smoothly");
});

app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/post", Post);
