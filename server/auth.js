const fs = require("fs");
const cookie = require("cookie");
const consola = require("consola");
const path = require("path");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const identityService = require("./service/identityService");
const cert = fs.readFileSync(path.resolve(__dirname, "key.pub"), "utf8");
const User = require("./models/User");
module.exports = () => {
  const routes = express.Router();
  routes.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password)
      return res.status(400).json({
        type: "error",
        message: "email and password fields are essential for authentication."
      });
    return identityService
      .Login(email, password)
      .then(result => {
        res.cookie("x-access-token", result.token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: false
        });
        res.cookie("refresh-token", result.refresh_token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: false
        });

        return res.json({
          type: result.type,
          message: result.message,
          token: result.token,
          refresh_token: result.refresh_token
        });
      })
      .catch(error => {
        consola.error(error);

        res.status(400).json({ message: error.message });
      });
  });

  routes.post("/register", (req, res) => {
    // add server side validate
    if (!req.body.fullName || !req.body.email || !req.body.hashedPassword) {
      res.status(500).json({ error: "invalid arguments" });
    }
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword
    });
    identityService
      .Register(user)
      .then(result => {
        res.status(201).json({ register: true });
      })
      .catch(error => {
        consola.error(error);
       
        res.status(500).json({ error: "an error occurred" });
      });
  });

  routes.get("/user", (req, res) => {
    try {
      let cookies =
        cookie.parse(
          "x-access-token=" +
            req.headers["x-access-token"] +
            "; refresh-token=" +
            req.headers["refresh-token"] || ""
        ) || cookie.parse(req.headers.cookie || "");

      const AuthCookie = cookies["x-access-token"];
      if (!AuthCookie)
        return res.status(401).json({
          type: "error",
          message: "x-access-token header not found.",
          config: {
            method: req.method,
            url: req.protocol + "://" + req.get("host") + req.originalUrl,
            data: req.data
          }
        });
      const token = AuthCookie.substring(7);
      const refreshtoken = cookies["refresh-token"];
      jwt.verify(token, cert, (error, result) => {
        if (error) {
          if (error.message == "jwt expired") {
            console.log("jwt expired :");
            return res.status(401).json({
              type: "error",
              message: "Provided token expaired.",
              error,
              config: {
                method: req.method,
                url: req.protocol + "://" + req.get("host") + req.originalUrl,
                data: req.data
              }
            });
          } else {
            return res.status(403).json({
              type: "error",
              message: "Provided token is invalid.",
              error,
              config: {
                method: req.method,
                url: req.protocol + "://" + req.get("host") + req.originalUrl,
                data: req.data
              }
            });
          }
        }

        return res.json({
          type: "success",
          message: "Provided token is valid.",
          result,
          token: AuthCookie,
          refreshToken: refreshtoken,
          config: {
            method: req.method,
            url: req.protocol + "://" + req.get("host") + req.originalUrl,
            data: req.data
          }
        });
      });
    } catch (error) {
      consola.error(error);
      return res.status(403).json({
        type: "error",
        message: "Provided token is invalid.",
        error,
        config: {
          method: req.method,
          url: req.protocol + "://" + req.get("host") + req.originalUrl,
          data: req.data
        }
      });
    }
  });

  return routes;
};
