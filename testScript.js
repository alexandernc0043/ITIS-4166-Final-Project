// ─── Config ───────────────────────────────────────────────────────────────────

// const apiURL = 'https://bookstore-api.aprechtel.com/api';
const apiURL = 'http://localhost:8080/api';

const randUserEmail = `user-${crypto.randomUUID().slice(0, 5)}@example.com`;
const loginCreds = { email: randUserEmail, password: 'password123' };
const userCreds = { email: 'user@example.com', password: 'password123' };
const adminCreds = { email: 'admin@admin.com', password: 'adminpassword' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const newLine = () => console.log('\n------------------------------\n');
const print = (data) => console.log(`Data: ${JSON.stringify(data)}`);

const handleResponse = (res) => {
  console.log(`Status Code: ${res.status}`);
  if (res.status >= 500) {
    throw new Error('INTERNAL SERVER ERROR');
  }
  if (res.status === 204) return null;
  return res.json();
};

const testCase = async (testName, code, reason, func) => {
  console.log(`${testName} - ${code} - ${reason}`);
  print(await func());
  newLine();
};

// ─── API ──────────────────────────────────────────────────────────────────────

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const jsonHeaders = { 'Content-Type': 'application/json' };

const post = (url, body, token) =>
  fetch(url, {
    method: 'POST',
    headers: token ? authHeaders(token) : jsonHeaders,
    body: JSON.stringify(body),
  }).then(handleResponse);

const get = (url, token) =>
  fetch(url, {
    headers: token ? authHeaders(token) : jsonHeaders,
  }).then(handleResponse);

const put = (url, body, token) =>
  fetch(url, {
    method: 'PUT',
    headers: token ? authHeaders(token) : jsonHeaders,
    body: JSON.stringify(body),
  }).then(handleResponse);

const patch = (url, body, token) =>
  fetch(url, {
    method: 'PATCH',
    headers: token ? authHeaders(token) : jsonHeaders,
    body: JSON.stringify(body),
  }).then(handleResponse);

const deleteRequest = (url, token) =>
  fetch(url, {
    method: 'DELETE',
    headers: token ? authHeaders(token) : jsonHeaders,
  }).then(handleResponse);

// ─── Auth ─────────────────────────────────────────────────────────────────────

const signUp = (userInfo) => post(`${apiURL}/auth/signup`, userInfo);
const login = (userInfo) => post(`${apiURL}/auth/login`, userInfo);

// ─── Authors ──────────────────────────────────────────────────────────────────

const createAuthor = (name, token) =>
  post(`${apiURL}/authors`, { name }, token);
const getAuthors = () => get(`${apiURL}/authors`);
const getAuthorById = (id) => get(`${apiURL}/authors/${id}`);
const getAuthorByIdBooks = (id) => get(`${apiURL}/authors/${id}/books`);
const updateAuthor = (id, name, token) =>
  put(`${apiURL}/authors/${id}`, { name }, token);
const deleteAuthor = (id, token) =>
  deleteRequest(`${apiURL}/authors/${id}`, token);

// ─── Books ────────────────────────────────────────────────────────────────────

const createBook = (data, token) => post(`${apiURL}/books`, data, token);
const getBooks = () => get(`${apiURL}/books`);
const getBookById = (id) => get(`${apiURL}/books/${id}`);
const getBookReviews = (id) => get(`${apiURL}/books/${id}/reviews`);
const updateBook = (id, data, token) =>
  put(`${apiURL}/books/${id}`, data, token);
const deleteBook = (id, token) => deleteRequest(`${apiURL}/books/${id}`, token);

// ─── Reviews ──────────────────────────────────────────────────────────────────

const createReview = (data, token) => post(`${apiURL}/reviews`, data, token);
const getReviews = () => get(`${apiURL}/reviews`);
const getReviewById = (id) => get(`${apiURL}/reviews/${id}`);
const updateReview = (id, data, token) =>
  put(`${apiURL}/reviews/${id}`, data, token);
const deleteReview = (id, token) =>
  deleteRequest(`${apiURL}/reviews/${id}`, token);

// ─── Users ────────────────────────────────────────────────────────────────────

const getMe = (token) => get(`${apiURL}/users/me`, token);
const updateMe = (data, token) => put(`${apiURL}/users/me`, data, token);
const getUsers = (token) => get(`${apiURL}/users`, token);
const getUserById = (id, token) => get(`${apiURL}/users/${id}`, token);
const updateUserRole = (id, role, token) =>
  patch(`${apiURL}/users/${id}`, { role }, token);
const deleteUser = (id, token) => deleteRequest(`${apiURL}/users/${id}`, token);

// ─── Token Setup ──────────────────────────────────────────────────────────────

console.log('Getting user token...');
const { accessToken: userToken } = await login(userCreds);
console.log('Getting admin token...');
const { accessToken: adminToken } = await login(adminCreds);

// ─── Tests ────────────────────────────────────────────────────────────────────

// ─── Authentication ───────────────────────────────────────────────────────────

await testCase('User Signup (Success)', 201, 'Account Created', () =>
  signUp(loginCreds),
);
await testCase('User Signup (Fail)', 409, 'Email Conflict', () =>
  signUp(loginCreds),
);
await testCase('User Signup (Fail)', 400, 'Bad Signup Data', () =>
  signUp({ email: 'abcdef' }),
);
await testCase('User Login (Success)', 200, 'Access Token Given', () =>
  login(loginCreds),
);
await testCase('User Login (Fail)', 400, 'Missing Credentials', () =>
  login({}),
);
await testCase('User Login (Fail)', 401, 'Invalid Credentials', () =>
  login({ email: 'admin@admin.com', password: 'wrongpassword' }),
);

// ─── Authors ──────────────────────────────────────────────────────────────────

let createdAuthor;
await testCase('Create Author (Success)', 201, 'Author Created', async () => {
  createdAuthor = await createAuthor(
    `Author Testing #${crypto.randomUUID().slice(0, 5)}`,
    adminToken,
  );
  return createdAuthor;
});
await testCase('Create Author (Fail)', 400, 'Bad Author Name', () =>
  createAuthor('', adminToken),
);
await testCase('Create Author (Fail)', 401, 'Invalid Token', () =>
  createAuthor('Author', 'invalid-token'),
);
await testCase('Create Author (Fail)', 403, 'Not Admin', () =>
  createAuthor('Author', userToken),
);
await testCase('Get All Authors (Success)', 200, 'List of Authors', () =>
  getAuthors(),
);
await testCase('Get Author by ID (Success)', 200, 'Author Found', () =>
  getAuthorById(createdAuthor.id),
);
await testCase('Get Author by ID (Fail)', 400, 'Bad ID', () =>
  getAuthorById('invalid-id'),
);
await testCase('Get Author by ID (Fail)', 404, 'Not Found', () =>
  getAuthorById(999999),
);
await testCase(
  'Get Author by ID Books (Success)',
  200,
  'Author with List of Books',
  () => getAuthorByIdBooks(createdAuthor.id),
);
await testCase('Get Author by ID Books (Fail)', 400, 'Bad ID', () =>
  getAuthorByIdBooks('invalid-id'),
);
await testCase('Get Author by ID Books (Fail)', 404, 'Not Found', () =>
  getAuthorByIdBooks(999999),
);
await testCase('Update Author by ID (Success)', 200, 'Author Updated', () =>
  updateAuthor(createdAuthor.id, 'Alexander Prechtel', adminToken),
);
await testCase('Update Author by ID (Fail)', 400, 'Bad Author Name', () =>
  updateAuthor(createdAuthor.id, 'abc', adminToken),
);
await testCase('Update Author by ID (Fail)', 401, 'Unauthorized', () =>
  updateAuthor(createdAuthor.id, 'abcdef', 'invalid-token'),
);
await testCase('Update Author by ID (Fail)', 403, 'Not Admin', () =>
  updateAuthor(createdAuthor.id, 'abcdef', userToken),
);
await testCase('Update Author by ID (Fail)', 404, 'Not Found', () =>
  updateAuthor(999999, 'Valid Name Here', adminToken),
);
await testCase('Delete Author by ID (Fail)', 401, 'Unauthorized', () =>
  deleteAuthor(createdAuthor.id, 'invalid-token'),
);
await testCase('Delete Author by ID (Fail)', 403, 'Not Admin', () =>
  deleteAuthor(createdAuthor.id, userToken),
);
await testCase('Delete Author by ID (Fail)', 404, 'Not Found', () =>
  deleteAuthor(999999, adminToken),
);
await testCase('Delete Author by ID (Success)', 204, 'Author Deleted', () =>
  deleteAuthor(createdAuthor.id, adminToken),
);

// ─── Books ────────────────────────────────────────────────────────────────────

// Need a fresh author since createdAuthor was deleted
let bookAuthor;
await testCase(
  'Create Author for Book Tests (Success)',
  201,
  'Author Created',
  async () => {
    bookAuthor = await createAuthor(
      `Book Author #${crypto.randomUUID().slice(0, 5)}`,
      adminToken,
    );
    return bookAuthor;
  },
);

const validBook = {
  name: 'The Very Hungry Caterpillar',
  price: 9.99,
  published: '2026-03-29',
  authorId: bookAuthor.id,
};

let createdBook;
await testCase('Create Book (Success)', 201, 'Book Created', async () => {
  createdBook = await createBook(validBook, adminToken);
  return createdBook;
});
await testCase('Create Book (Fail)', 400, 'Bad Book Data', () =>
  createBook({ name: 'abc' }, adminToken),
);
await testCase('Create Book (Fail)', 401, 'Unauthorized', () =>
  createBook(validBook, 'invalid-token'),
);
await testCase('Create Book (Fail)', 403, 'Not Admin', () =>
  createBook(validBook, userToken),
);
await testCase('Get All Books (Success)', 200, 'List of Books', () =>
  getBooks(),
);
await testCase('Get Book by ID (Success)', 200, 'Book Found', () =>
  getBookById(createdBook.id),
);
await testCase('Get Book by ID (Fail)', 400, 'Bad ID', () =>
  getBookById('invalid-id'),
);
await testCase('Get Book by ID (Fail)', 404, 'Not Found', () =>
  getBookById(999999),
);
await testCase('Get Book Reviews (Success)', 200, 'Book with Reviews', () =>
  getBookReviews(createdBook.id),
);
await testCase('Get Book Reviews (Fail)', 400, 'Bad ID', () =>
  getBookReviews('invalid-id'),
);
await testCase('Get Book Reviews (Fail)', 404, 'Not Found', () =>
  getBookReviews(999999),
);
await testCase('Update Book by ID (Success)', 200, 'Book Updated', () =>
  updateBook(
    createdBook.id,
    {
      name: 'Updated Book Name',
      price: 14.99,
      published: '2026-03-29',
      authorId: bookAuthor.id,
    },
    adminToken,
  ),
);
await testCase('Update Book by ID (Fail)', 400, 'Bad Book Data', () =>
  updateBook(createdBook.id, { name: 'abc' }, adminToken),
);
await testCase('Update Book by ID (Fail)', 401, 'Unauthorized', () =>
  updateBook(createdBook.id, validBook, 'invalid-token'),
);
await testCase('Update Book by ID (Fail)', 403, 'Not Admin', () =>
  updateBook(createdBook.id, validBook, userToken),
);
await testCase('Update Book by ID (Fail)', 404, 'Not Found', () =>
  updateBook(999999, validBook, adminToken),
);
await testCase('Delete Book by ID (Fail)', 401, 'Unauthorized', () =>
  deleteBook(createdBook.id, 'invalid-token'),
);
await testCase('Delete Book by ID (Fail)', 403, 'Not Admin', () =>
  deleteBook(createdBook.id, userToken),
);
await testCase('Delete Book by ID (Fail)', 404, 'Not Found', () =>
  deleteBook(999999, adminToken),
);
await testCase('Delete Book by ID (Success)', 204, 'Book Deleted', () =>
  deleteBook(createdBook.id, adminToken),
);

// ─── Reviews ──────────────────────────────────────────────────────────────────

// Need a book for review tests since createdBook was deleted
let reviewBook;
await testCase(
  'Create Book for Review Tests (Success)',
  201,
  'Book Created',
  async () => {
    reviewBook = await createBook(
      {
        name: 'Review Test Book',
        price: 9.99,
        published: '2026-03-29',
        authorId: bookAuthor.id,
      },
      adminToken,
    );
    return reviewBook;
  },
);

const validReview = {
  content: 'This was a really good book!',
  rating: 5,
  bookId: reviewBook.id,
};

let createdReview;
await testCase('Create Review (Success)', 201, 'Review Created', async () => {
  createdReview = await createReview(validReview, userToken);
  return createdReview;
});
await testCase('Create Review (Fail)', 400, 'Bad Review Data', () =>
  createReview({ content: 'ab', rating: 10, bookId: reviewBook.id }, userToken),
);
await testCase('Create Review (Fail)', 401, 'Unauthorized', () =>
  createReview(validReview, 'invalid-token'),
);
await testCase('Get All Reviews (Success)', 200, 'List of Reviews', () =>
  getReviews(),
);
await testCase('Get Review by ID (Success)', 200, 'Review Found', () =>
  getReviewById(createdReview.id),
);
await testCase('Get Review by ID (Fail)', 400, 'Bad ID', () =>
  getReviewById('invalid-id'),
);
await testCase('Get Review by ID (Fail)', 404, 'Not Found', () =>
  getReviewById(999999),
);
await testCase('Update Review by ID (Success)', 200, 'Review Updated', () =>
  updateReview(
    createdReview.id,
    { content: 'Updated review content!', rating: 4, bookId: reviewBook.id },
    userToken,
  ),
);
await testCase('Update Review by ID (Fail)', 400, 'Bad Review Data', () =>
  updateReview(createdReview.id, { content: 'ab', rating: 10 }, userToken),
);
await testCase('Update Review by ID (Fail)', 401, 'Unauthorized', () =>
  updateReview(createdReview.id, validReview, 'invalid-token'),
);
await testCase('Update Review by ID (Fail)', 403, 'Not Owner', () =>
  updateReview(createdReview.id, validReview, adminToken),
);
await testCase('Update Review by ID (Fail)', 404, 'Not Found', () =>
  updateReview(999999, validReview, userToken),
);
await testCase('Delete Review by ID (Fail)', 401, 'Unauthorized', () =>
  deleteReview(createdReview.id, 'invalid-token'),
);
await testCase('Delete Review by ID (Fail)', 403, 'Not Owner', () =>
  deleteReview(createdReview.id, adminToken),
);
await testCase('Delete Review by ID (Fail)', 404, 'Not Found', () =>
  deleteReview(999999, userToken),
);
await testCase('Delete Review by ID (Success)', 204, 'Review Deleted', () =>
  deleteReview(createdReview.id, userToken),
);
