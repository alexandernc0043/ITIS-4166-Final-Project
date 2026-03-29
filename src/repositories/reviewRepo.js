import prisma from '../config/db.js';
function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025':
      const userNotFoundError = new Error('Review not found');
      userNotFoundError.status = 404;
      throw userNotFoundError;
    case 'P2003':
      const authorNotFound = new Error('Author not found');
      authorNotFound.status = 400;
      throw authorNotFound;
    default:
      throw error;
  }
}
export async function createReview(data) {
  const createdReview = await prisma.review.create({ data });
  return createdReview;
}
export async function getReview(id) {
  try {
    const foundReview = await prisma.review.findUnique({ where: { id } });
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
