"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express_1 = __importDefault(require("express"));
const bcrypt = __importStar(require("bcrypt"));
const path = __importStar(require("path"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const app = express_1.default();
const passport_config_1 = require("./passport-config");
passport_config_1.initializePassport(passport_1.default, (email) => users.find((user) => user.email === email), (id) => users.find((user) => user.id === id));
const users = [
    {
        id: "1596851517399",
        name: "a",
        email: "a@a",
        password: "$2b$10$DsAO9Lz1dUO7k.4SYhneoO722bWqbYQbAmryGxvdJubo0uxPA2wva",
    },
];
app.set("view-engine", "ejs");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_flash_1.default());
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(method_override_1.default("_method"));
app.set("views", path.join(__dirname, "/views"));
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name });
});
app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
});
app.post("/login", checkNotAuthenticated, passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}));
app.get("/info", checkAuthenticated, (req, res) => {
    res.json(users);
});
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});
app.post("/register", checkNotAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect("/login");
    }
    catch (_a) {
        res.redirect("/register");
    }
}));
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
//# sourceMappingURL=entrypoint.js.map