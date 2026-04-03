import prisma from '../config/db.js';

function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025': {
      const authorNotFoundError = new Error('Author not found');
      authorNotFoundError.status = 404;
      throw authorNotFoundError;
    }
    default: {
      console.error('Error code: ', error.code);
      throw error;
    }
  }
}

export async function createAuthor(data) {
  try {
    const createdAuthor = await prisma.author.create({ data });
    return createdAuthor;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getAuthorById(id) {
  try {
    const foundAuthor = await prisma.author.findUniqueOrThrow({
      where: { id },
    });

    return foundAuthor;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getAllAuthors() {
  const authors = await prisma.author.findMany();
  return authors;
}
export async function getAuthorBooks(id) {
  try {
    const authorWithBooks = prisma.author.findUniqueOrThrow({
      where: { id },
      include: { books: true },
    });
    // const books = prisma.book.findMany({ where: { authorId: id } });
    return authorWithBooks;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function updateAuthor(id, data) {
  try {
    const updatedAuthor = await prisma.author.update({ where: { id }, data });
    return updatedAuthor;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function deleteAuthor(id) {
  try {
    const deleted = await prisma.author.delete({ where: { id } });
    return deleted;
  } catch (error) {
    handlePrismaError(error);
  }
}
