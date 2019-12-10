const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

const mongoose = require("mongoose");

const categoryHandler = require("./api/categories/index");
const itemsHandler = require('./api/items/index')
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
  mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err)
      console.log("connected to db :");
      else
      {
        console.log('error connecting to the db :', err);
      }
  });
  app.use("/api/items", itemsHandler);
  app.use("/api/categories", categoryHandler);
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
