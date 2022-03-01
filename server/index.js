const express = require("express");
const passport = require("passport");
const routes = require("../routes/index");
const session = require("express-session");
const controllers = require("../controllers");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const cookieSession = require("cookie-session");
require("../routes/auth");
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use(passport.initialize());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);
app.use(passport.session());
app.use("/api", routes);
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.get("/", (req, res) => res.render("index"));
app.get("/dashboard",isLoggedIn, controllers.createUser, (req, res) => res.render("dashboard", {
  name: req.user.displayName,
  pic: req.user.photos[0].value,
  email: req.user.emails[0].value,
  user__id: req.user.user__id,
  profile: req.user.profile1

}));
app.get("/create",isLoggedIn, controllers.createUser, (req, res) => res.render("createProfile", {
  name: req.user.displayName,
  pic: req.user.photos[0].value,
  email: req.user.emails[0].value,
  user__id: req.user.user__id
}))
app.get("/update",isLoggedIn, controllers.createUser, (req, res) => res.render("updateProfile", {
  name: req.user.displayName,
  pic: req.user.photos[0].value,
  email: req.user.emails[0].value,
  user__id: req.user.user__id
}))
app.get("/fail", (req, res) => res.send("You Failed to log in!"));
app.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res)=> {
    if(req.user.isNew)
    res.redirect("/create");
    else{
      res.redirect("/dashboard");
    }
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = app;
