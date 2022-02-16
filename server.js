// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
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
<<<<<<< HEAD
  const checkout = require("./routes/checkoutOrdersList")
=======
  const cart = require("./routes/cart")
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d


  // login routes
  app.use("/", login(db));
  app.use("/menu", homeRoutes(db));
<<<<<<< HEAD
  app.use("/checkout", checkout(db));
=======
  app.use("/cart", cart(db));
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d



  // Note: mount other resources here, using the same pattern above


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
