if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import * as bcrypt from "bcrypt";
import * as path from "path";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";

const app = express();
import { initializePassport } from "./passport-config";

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users: User[] = [
  {
    id: "1596851517399",
    name: "a",
    email: "a@a",
    password: "$2b$10$DsAO9Lz1dUO7k.4SYhneoO722bWqbYQbAmryGxvdJubo0uxPA2wva",
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "/views"));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: (req.user as User).name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/info", checkAuthenticated, (req, res) => {
  res.json(users);
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(8080);
