const express = require("express");
require('dotenv').config();
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoString = 'mongodb+srv://Iwa:9s19ULLhErty50W6@restfulapp.6wukzne.mongodb.net/testDB';
const port = process.env.PORT || 3000;

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      catalog: "/api",
    };

    this.middlewares();
    this.mongoose();
    this.routes();
  }

  mongoose() {
    mongoose.connect(mongoString);
    const database = mongoose.connection;
    
    database.on('error', (error) => {
        console.log(error)
    })
    
    database.once('connected', () => {
        console.log('Database Connected');
    })
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.catalog, require("../routes/catalog"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;