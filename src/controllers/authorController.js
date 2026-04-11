import * as service from '../services/authorService.js';
export async function deleteAuthorController(req, res) {
  const id = parseInt(req.params.id);
  await service.deleteAuthor(id);
  res.status(204).send();
}
export async function updateAuthorHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const updatedAuthor = await service.updateAuthor(id, { name });
  res.status(200).json(updatedAuthor);
}
export async function createAuthorHandler(req, res) {
  const { name } = req.body;
  const createdAuthor = await service.createAuthor({ name });
  res.status(201).json(createdAuthor);
}
export async function getAllAuthorsHandler(req, res) {
  const authors = await service.getAllAuthors();
  res.status(200).json(authors);
}
export async function getAuthorByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const author = await service.getAuthorById(id);
  res.status(200).json(author);
}
export async function getAuthorBooksHandler(req, res) {
  const id = parseInt(req.params.id);
  const books = await service.getAuthorBooks(id);
  res.status(200).json(books);
}
