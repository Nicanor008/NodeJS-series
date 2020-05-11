import express from "express";
import { connect } from "mongoose";
import { urlencoded, json } from "body-parser";
import { green, red, magenta } from "chalk";
import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);
import { config } from "dotenv";
import cors from "cors";
import path from "path";


// middlewares
const app = express();
config();

// global variables
const PORT = process.env.PORT || 4003;
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});


// templating views
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'));
app.set('views', 'views')

import authRoutes from "./users/auth_routes";
import userRoutes from "./users";

// app.use(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
    isLoggedIn: false,
    user: ""
  })
);

// api routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


// DB connection
connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(green("DB Running"));
  })
  .catch((error) => {
    console.log(red(`DB Connection failed ${error}`));
  });

// server
app.listen(PORT, () => {
  console.log(magenta(`Server running on http://localhost:${PORT}`));
});
