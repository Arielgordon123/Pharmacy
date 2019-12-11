// Register user
const bcrypt = require("bcrypt");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const path = require("path");
const cert = fs.readFileSync(path.resolve(__dirname, "../key.pub"), "utf8");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf8"
);
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Register = user => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.hashedPassword, 10).then(hash => {
      // Store hash in password DB.
      User.create({
        fullName: user.fullName,
        email: user.email,
        hashedPassword: hash
      })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          console.error(error);
          reject({ error: "Server Error" });
        });
    });
  });
};
const validateCookie = async (_jwt, token) => {
  // _jwt for backwards compatibility
  // console.log('token :', token)
  return await jwt.verify(token, cert, (error, result) => {
    // console.log('error, result :', error, result)
    if (error) return false;
    if (result) return { isVerify: true, result };
  });
};
// middleware function validate user request via the token from the cookies
const userValidation = (req, res, next) => {
  // console.log(' req.headers :',  req.headers);
  try {
    let token = req.headers["x-access-token"];

    if (!token && req.headers.cookie) {
      // console.log('req.headers.cookie :', req.headers, cookie)
      token = cookie.parse(req.headers.cookie);
      token = token["x-access-token"];
    }

    // console.log('token :', token)
    if (token) {
      token = token.substring(7);
      validateCookie(jwt, token).then(decodedToken => {
        if (decodedToken.isVerify) {
          // add the decoded token to the next handler
          res.locals.user = decodedToken.result;
          return next();
        } else {
          return res.status(403).json({
            type: "error",
            error: "provided token is not a valid token"
          });
        }
      });
    } else {
      throw new Error("Token is required");
    }
  } catch (error) {
    console.log("error in user validation func");
    console.error(error);
    return res.status(403).json({ type: "error", error: error.message });
  }
};

const tokenGenerator = (jwt, id, email,role, uid, name) => {
  return jwt.sign(
    { id, email,role, uid, name },
    privateKey,
    { algorithm: "RS256", expiresIn: 60 * 60 * 24 * 7 } // 7 days
  );
};

const Login = ( email, password) => {
  return new Promise((resolve, reject) => {
    console.log('email :', email);
    User.findOne({
      "email": email
    },{})
      .then(user => {
       
        if (user == null)
          reject(new Error("user or password wrong"));
       console.log('results :', user);
      
        bcrypt
          .compare(password, user.hashedPassword)
          .then(result => {
            if (result) {
              let uid = uuidv4(); // generate random User Id
              let date = new Date();
              let token = tokenGenerator(
                jwt,
                user.id,
                user.email,
                user.role,
                uid,
                user.fullName
              );
              resolve({
                type: 'success',
                message: 'User logged in.',
                //  user: { id: user.id, email: user.email, jwtid: uid },
                token: 'Baerer-' + token,
               
              })
            } else {
              reject({ type: "error", message: "user or password wrong" });
            }
          })
          .catch(err => {
            consola.error(err);
            reject({
              type: "error",
              message: "user or password wrong",
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        reject({ type: "error", message: err });
      });
  });
};

const getUserId = token => {
  const userId = jwt.verify(token, cert, (error, result) => {
    if (error) return null;
    if (result) return result.id;
  });
  return userId;
};

// if (results.length == 0)
//   return res
//     .status(403)
//     .json({ type: 'error', message: 'user or password wrong' })
module.exports = {
  Register,
  Login,
  validateCookie,
  userValidation,
  getUserId
  // login user

  // refresh token
};
