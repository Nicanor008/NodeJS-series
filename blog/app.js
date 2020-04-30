const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const multer = require("multer");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotEnv = require("dotenv")

const allRoutes = require("./api")

// middlewares
const app = express();
dotEnv.config();

// global variables
const DB_URI = "mongodb://127.0.0.1/blog";
const PORT = 4001;

const store = new MongoDBStore({
  uri: DB_URI,
  collection: "sessions",
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// api routes
allRoutes.startApp(app)

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// DB connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(chalk.green("DB Running"));
  })
  .catch((error) => {
    console.log(chalk.red(`DB Connection failed ${error}`));
  });

// server
app.listen(PORT, () => {
  console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
});
