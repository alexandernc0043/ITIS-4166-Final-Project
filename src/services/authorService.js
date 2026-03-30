import * as repo from '../repositories/authorRepo.js';
export async function deleteAuthor(id) {
  await repo.deleteAuthor(id);
}
export async function updateAuthor(id, data) {
  const updatedAuthor = await repo.updateAuthor(id, data);
  return updatedAuthor;
}
export async function createAuthor(data) {
  const createdAuthor = await repo.createAuthor(data);
  return createdAuthor;
}
export async function getAllAuthors() {
  const authors = await repo.getAllAuthors();
  return authors;
}
export async function getAuthorById(id) {
  const author = await repo.getAuthorById(id);
  return author;
}
