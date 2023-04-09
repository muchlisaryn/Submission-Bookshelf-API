const {
  addBook,
  getAllBooks,
  getOneBooks,
  changeDataBook,
  deleteBook,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getOneBooks,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: changeDataBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

module.exports = routes;
