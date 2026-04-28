import prisma from '../config/db.js';
function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025': {
      const reviewNotFoundError = new Error('Review not found');
      reviewNotFoundError.status = 404;
      throw reviewNotFoundError;
    }
    case 'P2003': {
      const authorNotFound = new Error('Book not found');
      authorNotFound.status = 400;
      throw authorNotFound;
    }
    default: {
      throw error;
    }
  }
}
export async function createReview(data) {
  try {
    const createdReview = await prisma.review.create({ data });
    return createdReview;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getReviewById(id) {
  try {
    const foundReview = await prisma.review.findUniqueOrThrow({
      where: { id },
    });
    return foundReview;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getAllReviews() {
  const reviews = await prisma.review.findMany();
  return reviews;
}
export async function updateReview(id, data) {
  try {
    const updatedReview = await prisma.review.update({ where: { id }, data });
    return updatedReview;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function deleteReview(id) {
  try {
    await prisma.review.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}
