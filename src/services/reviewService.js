import * as repo from '../repositories/reviewRepo.js';

export async function getAllReviews() {
  const reviews = await repo.getAllReviews();
  return reviews;
}
export async function getReviewById(id) {
  const review = await repo.getReviewById(id);
  return review;
}
export async function createReview(data) {
  const createdReview = await repo.createReview(data);
  return createdReview;
}
export async function updateReview(id, data) {
  const updatedReview = await repo.updateReview(id, data);
  return updatedReview;
}
export async function deleteReview(id) {
  await repo.deleteReview(id);
}
