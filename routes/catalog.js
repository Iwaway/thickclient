const express = require("express");
const router = express.Router();

const book_controller = require("../controller/bookController");
const author_controller = require("../controller/authorController");
const genre_controller = require("../controller/genreController");

/// BOOK ROUTES ///

router.get("/", book_controller.index);

router.post("/book/create", book_controller.book_create);

router.post("/book/:id/delete", book_controller.book_delete);

router.post("/book/:id/update", book_controller.book_update);

router.get("/book/:id", book_controller.book_detail);

router.get("/books", book_controller.book_list);

/// AUTHOR ROUTES ///

router.post("/author/create", author_controller.author_create);

router.post("/author/:id/delete", author_controller.author_delete);

router.post("/author/:id/update", author_controller.author_update);

router.get("/author/:id", author_controller.author_detail);

router.get("/authors", author_controller.author_list);

/// GENRE ROUTES ///

router.post("/genre/create", genre_controller.genre_create);

router.post("/genre/:id/delete", genre_controller.genre_delete);

router.post("/genre/:id/update", genre_controller.genre_update);

router.get("/genre/:id", genre_controller.genre_detail);

router.get("/genres", genre_controller.genre_list);

module.exports = router;
