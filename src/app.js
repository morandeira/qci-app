import express from "express";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import expressMySQLSession from "express-mysql-session";
import multer from "multer";
import * as uuid from 'uuid';

import { dirname, join, extname } from 'path';
import { fileURLToPath } from "url";
import { create } from "express-handlebars";

import { database, port } from "./config.js";
import routes from "./routes/index.js";
import * as handlebars from "./lib/handlebars.js"
import "./lib/passport.js";


// Intializations
const MySQLStore = expressMySQLSession(session);
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + extname(file.originalname).toLocaleLowerCase());
  }
});

// Settings
app.set("port", port);
app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: handlebars
  }).engine
);
app.set("view engine", ".hbs");


// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "nodemysql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  multer({
    storage,
    dest: join(__dirname, "public/img/uploads"),
    limits: {
      fieldSize: 5000000
    },
    fileFilter: (req, file, cb) => {
      const extension = /(jpg|jpeg|png|gif)/;
      const file_ext = extension.test(extname(file.originalname));
      console.log("file_ext: " + file_ext);
      req.isFileValid = file_ext;
      if (file_ext) {        
        return cb(null, true);
      } else {
        return cb(null, false);   
      };            
    }
  }).single('image')
);

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

// Routes
app.use(routes);

// Public
app.use(express.static(join(__dirname, "public")));

export default app;
