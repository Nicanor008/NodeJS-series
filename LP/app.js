const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotEnv = require("dotenv")
const cors = require("cors")
const YAML=require("yamljs")
const swaggerUi=require("swagger-ui-express")

const allRoutes = require("./api")

// middlewares
const app = express();
dotEnv.config();

const swaggerDocument = YAML.load('docs/swagger.yaml');

// global variables
const PORT = process.env.PORT || 4003;
const store = new MongoDBStore({
  uri: process.env.DB_URI_TEST,
  collection: "sessions",
});
app.use(cors());
app.use(bodyParser.json());
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

// documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// api routes
allRoutes.startApp(app)

// DB connection
mongoose
  .connect(process.env.DB_URI, {
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

module.exports = app // for tests
