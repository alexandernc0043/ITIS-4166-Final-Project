import { getReviewById } from '../repositories/reviewRepo.js';
export async function authorizeOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (review.userId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}
