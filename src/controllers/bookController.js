import * as service from '../services/bookService.js';

export async function getAllBookHandler(req, res) {
  const books = await service.getAllBooks();
  res.status(200).json(books);
}

export async function getBookByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const book = await service.getBookById(id);
  res.status(200).json(book);
}

export async function createBookHandler(req, res) {
  const { name, authorId, published, price } = req.body;
  const data = {
    name,
    authorId,
    published: new Date(published).toISOString(),
    price,
  };

  const createdBook = await service.createBook(data);
  res.status(201).json(createdBook);
}
export async function updateBookHandler(req, res) {
  const id = parseInt(req.params.id);
  const { published, name, authorId, price } = req.body;

  const updatedBook = await service.updateBook(id, {
    published: published ? new Date(published).toISOString() : undefined,
    name,
    authorId,
    price,
  });
  res.status(200).json(updatedBook);
}
export async function deleteBookHandler(req, res) {
  const id = parseInt(req.params.id);
  await service.deleteBook(id);
  res.status(204).send();
}
export async function getBookReviewsHandler(req, res) {
  const id = parseInt(req.params.id);
  const reviews = await service.getBookReviews(id);
  res.status(200).json(reviews);
}
