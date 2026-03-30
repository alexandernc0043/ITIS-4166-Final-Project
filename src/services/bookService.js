import * as repo from '../repositories/bookRepo.js';

export async function getBookById(id) {
  const book = await repo.getBookById(id);
  return book;
}
export async function getAllBooks() {
  const books = await repo.getAllBooks();
  return books;
}
export async function createBook(data) {
  const createdBook = await repo.createBook(data);
  return createdBook;
}
export async function updateBook(id, data) {
  const updatedBook = await repo.updateBook(id, data);
  return updatedBook;
}
export async function deleteBook(id) {
  await repo.deleteBook(id);
}
