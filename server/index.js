const express = require("express");
const consola = require("consola");
const auth = require("./auth");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoryHandler = require("./api/categories/index");
const itemsHandler = require("./api/items/index");
const searchHandler = require('./api/searchHandler')
const identityService = require('./service/identityService')

const admin = require('./api/admin/index')
// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";
require("dotenv").config();
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // connect to db
  mongoose.connect(
    process.env.dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) console.log("connected to db :");
      else {
        console.log("error connecting to the db :", err);
      }
    }
  );

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  app.use("/api/search", identityService.userValidation, searchHandler);
  app.use("/api/auth", auth());
  app.use("/api/items",identityService.userValidation, itemsHandler);
  app.use("/api/categories",identityService.userValidation, categoryHandler);
  app.use("/api/admin",identityService.userValidation, admin);
  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
