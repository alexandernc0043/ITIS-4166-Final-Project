import * as service from '../services/reviewService.js';
export async function getAllReviewHandler(req, res) {
  const reviews = await service.getAllReviews();
  res.status(200).json(reviews);
}
export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await service.getReviewById(id);
  res.status(200).json(review);
}
export async function createReviewHandler(req, res) {
  const { rating, content, bookId } = req.body;
  const { id } = req.user;
  const createdReview = await service.createReview({
    rating,
    content,
    userId: id,
    bookId,
  });
  res.status(201).json(createdReview);
}
export async function updateReviewHandler(req, res) {
  const { rating, content, bookId } = req.body;
  const { id } = parseInt(req.params.id);
  const updatedReview = await service.updateReview(id, {
    rating,
    content,
    bookId,
  });
  res.status(200).json(updatedReview);
}
export async function deleteReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  await service.deleteReview(id);
  res.status(204).send();
}
