import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import pool from "../database.js";
import * as helpers from "./helpers.js";

import { config } from "dotenv";

config();

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    
      async (req, username, password, done) => {
        const [rows] = await pool.query(
          process.env.SELECT_USERS_by_USERNAME,
          [username]
        );
        console.log(rows.length);
        if (rows.length > 0) {
          const user = rows[0];
          const validPassword = await helpers.matchPassword(
            password,
            user.password
          );
          if (validPassword) {
            done(null, user, req.flash("success", "Welcome " + user.username));
          } else {
            done(null, false, req.flash("message", "Incorrect Password"));
          }
        } else {
          return done(
            null,
            false,
            req.flash("message", "The Username does not exists.")
          );
        };
      }
       
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      let newUser = {
        fullname,
        username,
        password,
      };

      newUser.password = await helpers.encryptPassword(password);

      // Saving in the Database
      const [result] = await pool.query(process.env.INSERT_USER, newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query(process.env.SELECT_USERS_by_ID, [id]);
  done(null, rows[0]);
});
