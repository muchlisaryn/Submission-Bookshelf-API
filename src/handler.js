const { nanoid } = require("nanoid");
const data = require("./book");

const addBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  data.push(newBook);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooks = (req, h) => {
  const { reading, finished, name } = req.query;
  const books = data.map((book) => ({
    id: book?.id,
    name: book?.name,
    publisher: book?.publisher,
  }));
  const findBookByName = data.filter((book) => book.name == name)[0];

  if (reading > 0) {
    const books = data
      .filter((book) => book.reading === true)
      .map((item) => ({
        id: item?.id,
        name: item?.name,
        publisher: item?.publisher,
      }));
    const response = h.response({
      status: "success",
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  } else if (reading == 0) {
    const books = data
      .filter((book) => book.reading === false)
      .map((item) => ({
        id: item?.id,
        name: item?.name,
        publisher: item?.publisher,
      }));
    const response = h.response({
      status: "success",
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  } else if (finished > 0) {
    const books = data
      .filter((book) => book.finished === true)
      .map((item) => ({
        id: item?.id,
        name: item?.name,
        publisher: item?.publisher,
      }));
    const response = h.response({
      status: "success",
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  } else if (finished == 0) {
    const books = data
      .filter((book) => book.finished === false)
      .map((item) => ({
        id: item?.id,
        name: item?.name,
        publisher: item?.publisher,
      }));
    const response = h.response({
      status: "success",
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  } else if (findBookByName !== undefined) {
    const books = data
      .filter((book) => book.name == name)
      .map((item) => ({
        id: item?.id,
        name: item?.name,
        publisher: item?.publisher,
      }));
    const response = h.response({
      status: "success",
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  } else if (name?.length > 0 && findBookByName === undefined) {
    const response = h.response({
      status: "fail",
      message: `tidak ada buku dengan nama ${name}`,
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getOneBooks = (req, h) => {
  const { id } = req.params;
  const book = data.filter((book) => book.id === id)[0];

  if (book === undefined) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  console.log(book);
  const response = h.response({
    status: "success",
    data: {
      book,
    },
  });
  response.code(200);
  return response;
};

const changeDataBook = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = data.findIndex((book) => book.id === id);
  const findBook = data.filter((book) => book.id === id)[0];
  const finished = pageCount === readPage;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else if (findBook === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  data[index] = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: findBook.insertedAt,
    updatedAt,
  };
  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteBook = (req, h) => {
  const { id } = req.params;

  const index = data.findIndex((book) => book.id === id);
  const findBook = data.filter((book) => book.id === id)[0];

  if (findBook === undefined) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  data.splice(index, 1);
  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getOneBooks,
  changeDataBook,
  deleteBook,
};
