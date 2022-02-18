// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }))  // parse application/json
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['string1', 'string2'],

  // Cookie Options
  maxAge: 10 * 60 * 1000 // 24 hours
}))
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

  const login = require("./routes/index")
  const homeRoutes = require("./routes/homepage")
  const cart = require("./routes/cart")


  // login routes
  app.use("/", login(db));
  app.use("/menu", homeRoutes(db));
  app.use("/cart", cart(db));

// OrderPlaced
app.get("/orderPlaced", async (req, res) => {

    res.render('orderPlaced');
  })

  app.get("/orderPlaced/:id", async (req, res) => {

  app.get("/", (req, res) => {
    res.render("index");
  });

    res.render('orderPlaced');
  })


  // Note: mount other resources here, using the same pattern above
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
