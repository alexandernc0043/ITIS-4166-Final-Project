# Bookstore Management API — Testing Guide

**Base URL (Production):** [https://itis-4166-final-project.onrender.com/api](https://itis-4166-final-project.onrender.com/api)  
**Docs:** [https://itis-4166-final-project.onrender.com/api/docs/](https://itis-4166-final-project.onrender.com/api/docs/)

---

## Test Credentials

| Email              | Password        | Role  |
| ------------------ | --------------- | ----- |
| `user@example.com` | `password123`   | USER  |
| `admin@admin.com`  | `adminpassword` | ADMIN |

---

## Authentication Endpoints

### POST `/auth/signup`
**Description:** Creates a user and returns their information.  
**Access:** Public

#### 201 — Created
Provide a valid email and password (8–64 characters).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2026-03-29T02:41:10.737Z"
}
```

#### 400 — Bad Request
Provide an invalid email (e.g. `"abcdef"`) or a password shorter than 8 or longer than 64 characters.

**Response:**
```json
{
  "errors": [
    "Email is required",
    "Password is required"
  ]
}
```

#### 409 — Conflict
Sign up with a valid email and password, then execute again with the same credentials.

**Response:**
```json
{
  "error": "Email has already been used"
}
```

---

### POST `/auth/login`
**Description:** Authenticate a user and return an access token.  
**Access:** Public

#### 200 — Ok
Provide valid credentials for an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 400 — Bad Request
Omit the email or password from the request body.

**Response:**
```json
{
  "errors": [
    "Email is required",
    "Password is required"
  ]
}
```

#### 401 — Unauthorized
Provide credentials that don't match any existing account.

**Response:**
```json
{
  "error": "Invalid credentials"
}
```

---

## User Endpoints

### PUT `/users/me`
**Description:** Update the authenticated user.  
**Access:** Authenticated User

#### 200 — Ok
Provide a valid access token and a new email or password.

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "role": "USER",
  "createdAt": "2026-03-29T02:41:10.737Z"
}
```

#### 400 — Bad Request
Omit both email and password, provide an invalid email (e.g. `"abcdef"`), or provide a password outside the 8–64 character range.

**Response:**
```json
{
  "errors": [
    "Email or password is required",
    "Password must contain at least 8 characters and at most 64 characters",
    "Email must be valid"
  ]
}
```

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 404 — Not Found
Log in as a regular user to get their token, then use an admin account to delete that user, then attempt to update using the deleted user's token.

**Response:**
```json
{
  "error": "Resource 1 not found"
}
```

#### 409 — Conflict
Provide an email that is already in use by another account (e.g. `admin@admin.com`).

**Response:**
```json
{
  "error": "Email has already been used"
}
```

---

### GET `/users/me`
**Description:** Get the authenticated user's account.  
**Access:** Authenticated User

#### 200 — Ok
Provide a valid access token.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2026-03-29T02:41:10.737Z"
}
```

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 404 — Not Found
Log in as a regular user to get their token, then use an admin account to delete that user, then attempt to fetch using the deleted user's token.

**Response:**
```json
{
  "error": "Resource 1 not found"
}
```

---

### GET `/users/`
**Description:** Gets all users in the database.  
**Access:** Admin User

#### 200 — Ok
Provide a valid access token for an admin account.

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2026-03-29T02:41:10.737Z"
  }
]
```

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 403 — Forbidden
Provide an access token for a non-admin user.

**Response:**
```json
{
  "error": "Forbidden: insufficient permission"
}
```

---

### GET `/users/{id}`
**Description:** Gets a user by their ID.  
**Access:** Admin User

#### 200 — Ok
Provide a valid admin access token and a valid user ID (e.g. `1`).

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2026-03-29T02:41:10.737Z"
}
```

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

**Response:**
```json
{
  "errors": ["ID must be a positive integer"]
}
```

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 403 — Forbidden
Provide an access token for a non-admin user.

**Response:**
```json
{
  "error": "Forbidden: insufficient permission"
}
```

#### 404 — Not Found
Provide an ID that does not correspond to any existing user (e.g. `999`).

**Response:**
```json
{
  "error": "Resource 999 not found"
}
```

---

### PATCH `/users/{id}`
**Description:** Update a user's role.  
**Access:** Admin User

#### 200 — Ok
Provide a valid admin access token, a valid user ID, and a valid role (`USER` or `ADMIN`).

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "ADMIN",
  "createdAt": "2026-03-29T02:41:10.737Z"
}
```

#### 400 — Bad Request
Provide an invalid role value (e.g. `"ABC"`) or an invalid ID.

**Response:**
```json
{
  "errors": ["ID must be a positive integer"]
}
```

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 403 — Forbidden
Provide an access token for a non-admin user.

**Response:**
```json
{
  "error": "Forbidden: insufficient permission"
}
```

#### 404 — Not Found
Provide an ID that does not correspond to any existing user (e.g. `999`).

**Response:**
```json
{
  "error": "Resource 999 not found"
}
```

---

### DELETE `/users/{id}`
**Description:** Deletes a user by their ID.  
**Access:** Admin User

#### 204 — No Content
Provide a valid admin access token and a valid user ID.

#### 401 — Unauthorized
Make the request without providing an access token.

**Response:**
```json
{
  "error": "Not authenticated. Please provide a valid token."
}
```

#### 403 — Forbidden
Provide an access token for a non-admin user.

**Response:**
```json
{
  "error": "Forbidden: insufficient permission"
}
```

#### 404 — Not Found
Provide an ID that does not correspond to any existing user (e.g. `999`).

**Response:**
```json
{
  "error": "Resource 999 not found"
}
```

---

## Author Endpoints

### POST `/authors/`
**Description:** Create an author in the database.  
**Access:** Admin User

#### 201 — Created
Provide a valid admin access token and a name of at least 4 characters.

**Request Body:**
```json
{
  "name": "Alex Prechtel"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Alex Prechtel"
}
```

#### 400 — Bad Request
Provide a name shorter than 4 characters.

**Response:**
```json
{
  "error": "Name must be at least 4+ characters"
}
```

#### 401 — Unauthorized
Make the request without providing an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

---

### GET `/authors/`
**Description:** Get all authors.  
**Access:** Public

#### 200 — Ok

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alex Prechtel"
  }
]
```

---

### GET `/authors/{id}`
**Description:** Get an author by ID.  
**Access:** Public

#### 200 — Ok
Provide a valid author ID (e.g. `1`).

**Response:**
```json
{
  "id": 1,
  "name": "Alex Prechtel"
}
```

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 404 — Not Found
Provide an ID that does not correspond to any existing author (e.g. `999`).

---

### GET `/authors/{id}/books`
**Description:** Get all books by an author.  
**Access:** Public

#### 200 — Ok
Provide a valid author ID.

**Response:**
```json
{
  "id": 1,
  "name": "Alex Prechtel",
  "books": [
    {
      "id": 1,
      "name": "The Very Hungry Caterpillar",
      "price": 9.99,
      "published": "2026-03-29",
      "authorId": 1
    }
  ]
}
```

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 404 — Not Found
Provide an ID that does not correspond to any existing author (e.g. `999`).

---

### PUT `/authors/{id}`
**Description:** Update an author by ID.  
**Access:** Admin User

#### 200 — Ok
Provide a valid admin access token, a valid author ID, and a name of at least 4 characters.

**Request Body:**
```json
{
  "name": "Jane Doe"
}
```

#### 400 — Bad Request
Provide an invalid ID or a name shorter than 4 characters.

**Response:**
```json
{
  "errors": [
    "ID must be a positive integer",
    "Name must be at least 4 characters"
  ]
}
```

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing author (e.g. `999`).

---

### DELETE `/authors/{id}`
**Description:** Delete an author by ID.  
**Access:** Admin User

#### 204 — No Content
Provide a valid admin access token and a valid author ID.

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing author (e.g. `999`).

---

## Book Endpoints

### POST `/books/`
**Description:** Creates a book.  
**Access:** Admin User

#### 201 — Created
Provide a valid admin access token and all required fields.

**Request Body:**
```json
{
  "name": "The Very Hungry Caterpillar",
  "price": 9.99,
  "published": "2026-03-29",
  "authorId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "name": "The Very Hungry Caterpillar",
  "price": 9.99,
  "published": "2026-03-29",
  "authorId": 1
}
```

#### 400 — Bad Request
Omit a required field or provide invalid values (e.g. negative price, name shorter than 4 characters).

**Response:**
```json
{
  "error": [
    "Name must be provided.",
    "Price must be provided",
    "Price must be at least 1.00.",
    "AuthorId must be provided",
    "Published must be provided",
    "Published must be a date"
  ]
}
```

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

---

### GET `/books/`
**Description:** Get all books.  
**Access:** Public

#### 200 — Ok

**Response:**
```json
[
  {
    "id": 1,
    "name": "The Very Hungry Caterpillar",
    "price": 9.99,
    "published": "2026-03-29",
    "authorId": 1
  }
]
```

---

### GET `/books/{id}`
**Description:** Get a book by ID.  
**Access:** Public

#### 200 — Ok
Provide a valid book ID (e.g. `1`).

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 404 — Not Found
Provide an ID that does not correspond to any existing book (e.g. `999`).

---

### GET `/books/{id}/reviews`
**Description:** Get all reviews for a book.  
**Access:** Public

#### 200 — Ok
Provide a valid book ID.

**Response:**
```json
{
  "id": 1,
  "name": "Book Name",
  "price": 1.99,
  "published": "2026-03-09T00:00:00:000Z",
  "authorId": 1,
  "reviews": [
    {
      "id": 1,
      "content": "Review Content",
      "createdAt": "2026-03-09T00:00:00:000Z",
      "rating": 5,
      "bookId": 1,
      "userId": 1
    }
  ]
}
```

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 404 — Not Found
Provide an ID that does not correspond to any existing book (e.g. `999`).

---

### PUT `/books/{id}`
**Description:** Update a book by ID.  
**Access:** Admin User

#### 200 — Ok
Provide a valid admin access token, a valid book ID, and valid update data.

#### 400 — Bad Request
Provide an invalid ID or invalid book data.

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing book (e.g. `999`).

**Response:**
```json
{
  "error": "Resource 999 not found"
}
```

---

### DELETE `/books/{id}`
**Description:** Delete a book by ID.  
**Access:** Admin User

#### 204 — No Content
Provide a valid admin access token and a valid book ID.

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing book (e.g. `999`).

---

## Review Endpoints

### POST `/reviews/`
**Description:** Creates a review.  
**Access:** Authenticated User

#### 201 — Created
Provide a valid access token and all required fields.

**Request Body:**
```json
{
  "content": "This was a really good book!",
  "rating": 5,
  "bookId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "content": "This was a really good book!",
  "createdAt": "2026-03-29T02:41:10.737Z",
  "rating": 5,
  "bookId": 1,
  "userId": 1
}
```

#### 400 — Bad Request
Provide a rating outside the 1–5 range, content shorter than 3 characters, or an invalid `bookId`.

**Response:**
```json
{
  "error": [
    "Rating must be between 1 and 5.",
    "Book Must be valid.",
    "Content must be at least 3 characters."
  ]
}
```

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Provide an access token for a non-admin user on a protected operation.

---

### GET `/reviews/`
**Description:** Get all reviews.  
**Access:** Public

#### 200 — Ok

**Response:**
```json
[
  {
    "id": 1,
    "content": "This was a really good book!",
    "createdAt": "2026-03-29T02:41:10.737Z",
    "rating": 5,
    "bookId": 1,
    "userId": 1
  }
]
```

---

### GET `/reviews/{id}`
**Description:** Get a review by ID.  
**Access:** Public

#### 200 — Ok
Provide a valid review ID (e.g. `1`).

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 404 — Not Found
Provide an ID that does not correspond to any existing review (e.g. `999`).

---

### PUT `/reviews/{id}`
**Description:** Update a review by ID.  
**Access:** Authenticated User

#### 200 — Ok
Provide a valid access token, a valid review ID, and valid update data.

**Request Body:**
```json
{
  "content": "Updated review content.",
  "rating": 4,
  "bookId": 1
}
```

#### 400 — Bad Request
Provide invalid review data (e.g. rating outside 1–5, content shorter than 3 characters).

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Attempt to update a review that does not belong to the authenticated user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing review (e.g. `999`).

**Response:**
```json
{
  "error": "Resource 999 not found"
}
```

---

### DELETE `/reviews/{id}`
**Description:** Delete a review by ID.  
**Access:** Authenticated User

#### 204 — No Content
Provide a valid access token and a valid review ID belonging to the authenticated user.

#### 400 — Bad Request
Provide an invalid ID such as `-1`.

#### 401 — Unauthorized
Make the request without an access token.

#### 403 — Forbidden
Attempt to delete a review that does not belong to the authenticated user.

#### 404 — Not Found
Provide an ID that does not correspond to any existing review (e.g. `999`).

---

## Monitoring

### GET `/health`
**Description:** Returns the current status of the API.  
**Access:** Public

#### 200 — Ok

**Response:**
```json
{
  "status": "ok"
}
```