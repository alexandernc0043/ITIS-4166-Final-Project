import * as service from '../services/bookService.js';
export async function getAllBookHandler(req, res) {
  const reviews = await service.getAllBooks();
  res.status(200).json(reviews);
}
export async function getBookByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await service.getBookById(id);
  res.status(200).json(review);
}
export async function createBookHandler(req, res) {
  const { rating, content, bookId } = req.body;
  const { id } = req.user;
  const createdBook = await service.createBook({
    rating,
    content,
    userId: id,
    bookId,
  });
  res.status(201).json(createdBook);
}
export async function updateBookHandler(req, res) {
  const { published, name, authorId } = req.body;
  const { id } = req.user;
  const updatedBook = await service.updateBook(id, {
    published,
    name,
    authorId,
  });
  res.status(200).json(updatedBook);
}
export async function deleteBookHandler(req, res) {
  const id = parseInt(req.params.id);
  await service.deleteBook(id);
  res.status(204);
}
