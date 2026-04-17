import prisma from '../config/db.js';
function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025': {
      const reviewNotFoundError = new Error('Book not found');
      reviewNotFoundError.status = 404;
      throw reviewNotFoundError;
    }
    case 'P2003': {
      const authorNotFound = new Error('Author not found');
      authorNotFound.status = 400;
      throw authorNotFound;
    }
    default: {
      throw error;
    }
  }
}
export async function getBookById(id) {
  try {
    const book = await prisma.book.findUniqueOrThrow({ where: { id } });
    return book;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getAllBooks() {
  const books = await prisma.book.findMany();
  return books;
}
export async function createBook(data) {
  try {
    const book = await prisma.book.create({ data });
    return book;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function updateBook(id, data) {
  try {
    const book = await prisma.book.update({ where: { id }, data });
    return book;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function deleteBook(id) {
  try {
    await prisma.book.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getBookReviews(id) {
  try {
    const reviews = await prisma.book.findMany({
      where: { id },
      include: { reviews: true },
    });
    return reviews;
  } catch (error) {
    handlePrismaError(error);
  }
}
