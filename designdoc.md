Alexander Prechtel

Professor Cao

ITIS 4166 051

March 23, 2026

## API Overview

### Description

My API will be a bookstore management system where users can checkout books, view books, and admins will be able to create / delete / update books/authors/users on the system.

Resources for my system are listed below.

## Book Resources

### Get Book (Single)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/book/:id` | `GET` | Gets a book in the database | `All` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "The Very Hungry Caterpillar",
  "price": 9.99,
  "published": "June 3, 1969",
  "Genre": ["Picture Book", "Children's Literature", "Fiction"],
  "author": {
    "id": 1,
    "name": "Eric Carle"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Book not found |
| `400` | `Bad Request` | No ID provided |

---

### Get Book (All)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/book` | `GET` | Gets all books in the database | `All` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "name": "The Very Hungry Caterpillar",
    "price": 9.99,
    "published": "June 3, 1969",
    "Genre": ["Picture Book", "Children's Literature", "Fiction"],
    "author": {
      "id": 1,
      "name": "Eric Carle"
    }
  },
  {
    "id": 2,
    "name": "Book",
    "price": 19.99,
    "published": "January 3, 2001",
    "Genre": ["Fiction"],
    "author": {
      "id": 1,
      "name": "Eric Carle"
    }
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `None` | `None` | No error responses |

---

### Get Book Reviews

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/book/:id/reviews` | `GET` | Gets all reviews for a book in the database | `All` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "content": "Great book!",
    "rating": 5,
    "createdAt": "March 24, 2026",
    "user": {
      "id": 1,
      "name": "Alex"
    }
  },
  {
    "id": 2,
    "content": "Ok book!",
    "rating": 3,
    "createdAt": "March 24, 2026",
    "user": {
      "id": 1,
      "name": "Alex"
    }
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Book not found |

---

### Create Book

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/books` | `POST` | Creates a book in the database | `ADMIN` |

**Success Response**: `201 (Created)`

```json
{
  "id": 1,
  "name": "The Very Hungry Caterpillar",
  "price": 9.99,
  "published": "June 3, 1969",
  "Genre": ["Picture Book", "Children's Literature", "Fiction"],
  "author": {
    "id": 1,
    "name": "Eric Carle"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `400` | `Bad Request` | Missing required field (`Name`, `Price`, `Published`, `Genre`, `AuthorId`) |
| `400` | `Bad Request` | Name must be 5 characters or more |
| `400` | `Bad Request` | Price must be greater than 0 |
| `401` | `Unauthorized` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |
| `404` | `Not Found` | Author does not exist |

---

### Update Book

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/books/:id` | `PUT` | Updates a book in the database | `ADMIN` |

**Success Response**: `201 (Created)`

```json
{
  "id": 1,
  "name": "The Very Sad Caterpillar",
  "price": 9.99,
  "published": "June 3, 1969",
  "Genre": ["Picture Book", "Children's Literature", "Fiction"],
  "author": {
    "id": 1,
    "name": "Eric Carle"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Book not found |
| `404` | `Not Found` | Name must be 5 characters or more |
| `404` | `Not Found` | Price must be greater than 0 |
| `400` | `Bad Request` | No fields provided |
| `404` | `Not Found` | Author not found |

---

### Delete Book

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/books/:id` | `DELETE` | Deletes a book in the database | `ADMIN` |

**Success Response**: `204 (No Content)`

```json
{
  "id": 1,
  "name": "The Very Sad Caterpillar",
  "price": 9.99,
  "published": "June 3, 1969",
  "Genre": ["Picture Book", "Children's Literature", "Fiction"],
  "author": {
    "id": 1,
    "name": "Eric Carle"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Book not found |
| `401` | `Unauthorized` | User not authenticated |
| `403` | `Forbidden` | User is not an admin |

## Review Resources

### Get Review (Single)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/reviews/:id` | `GET` | Gets a review in the database | `All` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "content": "Great book!",
  "rating": 5,
  "createdAt": "March 24, 2026",
  "user": {
    "id": 1,
    "name": "Alex"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Review not found |

### Get Review (All)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/reviews` | `GET` | Gets all reviews in the database | `All` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "content": "Great book!",
    "rating": 5,
    "createdAt": "March 24, 2026",
    "user": {
      "id": 1,
      "name": "Alex"
    }
  },
  {
    "id": 2,
    "content": "Ok book!",
    "rating": 3,
    "createdAt": "March 24, 2026",
    "user": {
      "id": 1,
      "name": "Alex"
    }
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `None` | `None` | No error responses |

---

### Create Review

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/reviews` | `POST` | Creates a review in the database | `Authenticated User` |

**Success Response**: `201 (Created)`

```json
{
  "id": 1,
  "content": "Great book!",
  "rating": 5,
  "createdAt": "March 24, 2026",
  "user": {
    "id": 1,
    "name": "Alex"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Book not found |
| `401` | `Unauthorized` | User is not authenticated |
| `400` | `Bad Request` | Missing fields |
| `400` | `Bad Request` | Rating must be between 1 and 5 |
| `400` | `Bad Request` | Content must be at least 3 characters |

---

### Update Review

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/review/:id` | `PUT` | Updates a review in the database | `User (Owner)` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "content": "Ok book!",
  "rating": 3,
  "createdAt": "March 24, 2026",
  "user": {
    "id": 1,
    "name": "Alex"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Review not found |
| `403` | `Forbidden` | User does not own the review |
| `400` | `Bad Request` | Missing fields |
| `400` | `Bad Request` | Rating must be between 1 and 5 |
| `400` | `Bad Request` | Content must be at least 3 characters |

---

### Delete Review

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/reviews/:id` | `DELETE` | Deletes a book in the database | `Owner (User), Admin` |

**Success Response**: `204 (No Content)`

```json
{
  "id": 1,
  "content": "Great book!",
  "rating": 5,
  "createdAt": "March 24, 2026",
  "user": {
    "id": 1,
    "name": "Alex"
  }
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Review not found |
| `401` | `Unauthenticated` | User is not authenticated |
| `403` | `Forbidden` | User is not the owner of the review or admin |

---

## Author Resources

### Get Author (Single)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/author/:id` | `GET` | Gets an author in the database | `All` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Eric Carle"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Author not found |

---

### Get Author (All)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/author` | `GET` | Gets all authors in the database | `All` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "name": "Eric Carle"
  },
  {
    "id": 2,
    "name": "John Doe"
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `None` | `None` | No error responses |

---

### Get Author's Books

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/author/:id/books` | `GET` | Gets all author's books in the database | `All` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "name": "The Very Hungry Caterpillar",
    "price": 9.99,
    "published": "June 3, 1969",
    "Genre": ["Picture Book", "Children's Literature", "Fiction"],
    "author": {
      "id": 1,
      "name": "Eric Carle"
    }
  },
  {
    "id": 2,
    "name": "Book",
    "price": 19.99,
    "published": "January 3, 2001",
    "Genre": ["Fiction"],
    "author": {
      "id": 1,
      "name": "Eric Carle"
    }
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Author not found |

---

### Create Author

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/author` | `POST` | Creates an author in the database | `Admin` |

**Success Response**: `201 (Created)`

```json
{
  "id": 1,
  "name": "Eric Carle"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `400` | `Bad Request` | Missing name field |
| `400` | `Bad Request` | Name must be at least 4+ characters |
| `401` | `Unauthorized` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

### Update Author

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/review/:id` | `PUT` | Updates an author in the database | `Admin` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex P"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Author not found |
| `400` | `Bad Request` | Missing name field |
| `400` | `Bad Request` | Name must be at least 4+ characters |
| `401` | `Unauthorized` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

### Delete Author

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/author/:id` | `DELETE` | Deletes an author in the database | `Admin` |

**Success Response**: `204 (No Content)`

```json
{
  "id": 1,
  "name": "Alex P"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | Author not found |
| `401` | `Unauthorized` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

## User Resources

## Get User

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/users/me` | `GET` | Gets the logged in user | `Authenticated User` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex",
  "email": "alex@example.com",
  "createdAt": "March 24, 2026",
  "role": "USER"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | User not found |
| `401` | `Unauthorized` | User is not authenticated |

---

## Update User

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/users/me` | `PUT` | Updates the logged in user | `Authenticated User` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex P",
  "email": "aprechte@charlotte.edu",
  "createdAt": "March 24, 2026",
  "role": "USER"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | User not found |
| `400` | `Bad Request` | Missing fields |
| `400` | `Bad Request` | Name must be at least 4+ characters |
| `400` | `Bad Request` | Email must be valid |
| `401` | `Unauthorized` | User is not authenticated |

---

## Get Users (All)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/users` | `GET` | Gets all users | `Admin` |

**Success Response**: `200 (OK)`

```json
[
  {
    "id": 1,
    "name": "Alex P",
    "email": "aprechte@charlotte.edu",
    "createdAt": "March 24, 2026",
    "role": "USER"
  },
  {
    "id": 2,
    "name": "John Doe",
    "email": "jdoe@example.com",
    "createdAt": "March 24, 2026",
    "role": "USER"
  },
  ...
]
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `401` | `Unauthenticated` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

## Get Users (Single)

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/users/:id` | `GET` | Gets a user | `Admin` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex P",
  "email": "aprechte@charlotte.edu",
  "createdAt": "March 24, 2026",
  "role": "USER"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | User not found |
| `401` | `Unauthenticated` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

## Update Role

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/users/:id` | `PATCH` | Updates a user's role | `Admin` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex P",
  "email": "aprechte@charlotte.edu",
  "createdAt": "March 24, 2026",
  "role": "ADMIN"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `404` | `Not Found` | User not found |
| `400` | `Bad Request` | Invalid role |
| `400` | `Bad Request` | Role must be `USER` or `ADMIN` |
| `401` | `Unauthenticated` | User is not authenticated |
| `403` | `Forbidden` | User is not an admin |

---

## Authentication Endpoints

### Login

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/auth/login` | `POST` | Log into an account | `All` |

**Success Response**: `200 (OK)`

```json
{
  "accessToken": "..."
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `400` | `Bad Request` | Invalid login details |
| `400` | `Bad Request` | Email or password missing |
| `401` | `Unauthenticated` | Incorrect login details |
| `401` | `Unauthenticated` | Email or password is incorrect |

---

### Sign Up

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/api/auth/signup` | `POST` | Create an account | `All` |

**Success Response**: `200 (OK)`

```json
{
  "id": 1,
  "name": "Alex",
  "email": "alex@example.com",
  "createdAt": "March 24, 2026",
  "role": "USER"
}
```

#### Error Responses

| Status | Error | Details |
| --- | --- | --- |
| `400` | `Bad Request` | Invalid login details |
| `400` | `Bad Request` | Email or password missing |
| `400` | `Bad Request` | Email is not valid |
| `400` | `Bad Request` | Password must be 8+ characters |
| `401` | `Unauthenticated` | Incorrect login details |
| `401` | `Unauthenticated` | Email or password is incorrect |
| `409` | `Conflict` | Email is already in use |
