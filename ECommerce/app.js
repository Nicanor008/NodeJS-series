const express = require("express");
const mongoose = require("mongoose");
// const csrf = require('csurf')
const bodyParser = require("body-parser");
var morgan = require('morgan')
const chalk = require("chalk");

// create "middleware"
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

// const csrfProtection = csrf()

// DB Connection 
// Cloud DB link mongodb+srv://nicanor:nicanor@cluster0-mfpbg.mongodb.net/ecommerce?retryWrites=true&w=majority
mongoose
  .connect("mongodb://127.0.0.1/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(chalk.green(`DB  connection`))
  })
  .catch((err) => 
  console.log(chalk.red(err))
  );

const PORT = 4001;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);


app.listen(PORT, () => {
  console.log(chalk.magenta(`server running on http://localhost/${PORT}`))
});
