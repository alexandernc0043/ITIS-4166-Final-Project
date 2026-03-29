Alexander Prechtel

Professor Cao

ITIS 4166 051

March 23, 2026

## API Overview

### Description

My API will be a bookstore management system where users can checkout books, view books, and admins will be able to create / delete / update books/authors/users on the system.

Resources for my system are listed below

## Book Resources

### Get Book (Single)

**Endpoint**: ``/api/book/:id``

**Method**: ``GET``

**Description**: ``Gets a book in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- 404 - Not Found - Book not found
- 400 - Bad Request - No Id provided

---

### Get Book (All)

**Endpoint**: ``/api/book``

**Method**: ``GET``

**Description**: ``Gets all books in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- None

---

### Get Book Reviews

**Endpoint**: ``/api/book/:id/reviews``

**Method**: ``GET``

**Description**: ``Gets all reviews for a book in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- 404 - Not Found - Book not found

---

### Create Book

**Endpoint**: ``/api/books``

**Method**: ``POST``

**Description**: ``Creates a book in the database``

**Access**: ``ADMIN``

**Success Response**: ``201 (Created)``

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

- 400 - Bad Request - Missing required field (Name, Price, Published, Genre, AuthorId)
  - Name must be 5 characters or more
  - Price must be greater than 0
- 401 - Unauthorized - User is not authenticated
- 403 - Forbidden - User is not an admin
- 404 - Not Found - Author does not exist

---

### Update Book

**Endpoint**: ``/api/books/:id``

**Method**: ``PUT``

**Description**: ``Updates a book in the database``

**Access**: ``ADMIN``

**Success Response**: ``201 (Created)``

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

- 404 - Not Found - Book not found
  - Name must be 5 characters or more
  - Price must be greater than 0
- 400 - Bad Request - No fields provided
- 404 - Not Found - Author not found

---

### Delete Book

**Endpoint**: ``/api/books/:id``

**Method**: ``DELETE``

**Description**: ``Deletes a book in the database``

**Access**: ``ADMIN``

**Success Response**: ``204 (No Content)``

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

- 404 - Not Found - Book not found
- 401 - Unauthorized - User not authenticated
- 403 - Forbidden - User is not an admin

## Review Resources

### Get Review (Single)

**Endpoint**: ``/api/reviews/:id``

**Method**: ``GET``

**Description**: ``Gets a review in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- 404 - Not Found - Review not found

### Get Review (All)

**Endpoint**: ``/api/reviews``

**Method**: ``GET``

**Description**: ``Gets all reviews in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- None

---

### Create Review

**Endpoint**: ``/api/reviews``

**Method**: ``POST``

**Description**: ``Creates a review in the database``

**Access**: ``Authenticated User``

**Success Response**: ``201 (Created)``

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
},

```

#### Error Responses

- 404 - Not Found - Book not found
- 401 - Unauthorized - User is not authenticated
- 400 - Bad Request - Missing fields or
  - Rating must be between 1 - 5
  - Content must be at least 3 characters

---

### Update Review

**Endpoint**: ``/api/review/:id``

**Method**: ``PUT``

**Description**: ``Updates a review in the database``

**Access**: ``User (Owner)``

**Success Response**: ``200 (OK)``

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
},
```

#### Error Responses

- 404 - Not Found - Review not found
- 403 - Forbidden - User does not own the review
- 400 - Bad Request - Missing fields or
  - Rating must be between 1 - 5
  - Content must be at least 3 characters

---

### Delete Review

**Endpoint**: ``/api/reviews/:id``

**Method**: ``DELETE``

**Description**: ``Deletes a book in the database``

**Access**: ``Owner (User), Admin``

**Success Response**: ``204 (No Content)``

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
},
```

#### Error Responses

- 404 - Not Found - Review not found
- 401 - Unauthenticated - User is not authenticated
- 403 - Forbidden - User is not the owner of the review or admin

---

## Author Resources

### Get Author (Single)

**Endpoint**: ``/api/author/:id``

**Method**: ``GET``

**Description**: ``Gets an author in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

```json
{
    "id": 1,
    "name": "Eric Carle"
}
```

#### Error Responses

- 404 - Not Found - Author not found

---

### Get Author (All)

**Endpoint**: ``/api/author``

**Method**: ``GET``

**Description**: ``Gets all authors in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- None

---

### Get Author's Books

**Endpoint**: ``/api/author/:id/books``

**Method**: ``GET``

**Description**: ``Gets all author's books in the database``

**Access**: ``All``

**Success Response**: ``200 (OK)``

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

- 404 - Not found - Author not found

---

### Create Author

**Endpoint**: ``/api/author``

**Method**: ``POST``

**Description**: ``Creates an author in the database``

**Access**: ``Admin``

**Success Response**: ``201 (Created)``

```json
{
    "id": 1,
    "name": "Eric Carle"
}
```

#### Error Responses

- 400 - Bad Request - Missing name field or
  - Name must be at least 4+ characters
- 401 - Unauthorized - User is not authenticated
- 403 - Forbidden - User is not an admin

---

### Update Author

**Endpoint**: ``/api/review/:id``

**Method**: ``PUT``

**Description**: ``Updates an author in the database``

**Access**: ``Admin``

**Success Response**: ``200 (OK)``

```json
{
    "id": 1,
    "name": "Alex P"
}
```

#### Error Responses

- 404 - Not Found - Author not found
- 400 - Bad Request - Missing name field or
  - Name must be at least 4+ characters
- 401 - Unauthorized - User is not authenticated
- 403 - Forbidden - User is not an admin

---

### Delete Author

**Endpoint**: ``/api/author/:id``

**Method**: ``DELETE``

**Description**: ``Deletes an author in the database``

**Access**: ``Admin``

**Success Response**: ``204 (No Content)``

```json
{
    "id": 1,
    "name": "Alex P"
}
```

#### Error Responses

- 404 - Not Found - Author not found
- 401 - Unauthorized - User is not authenticated
- 403 - Forbidden - User is not an admin

---

## User Resources

## Get User

**Endpoint**: ``/api/users/me``

**Method**: ``GET``

**Description**: ``Gets the logged in user``

**Access**: ``Authenticated User``

**Success Response**: ``200 (OK)``

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

- 404 - Not Found - User not found
- 401 - Unauthorized - User is not authenticated

---

## Update User

**Endpoint**: ``/api/users/me``

**Method**: ``PUT``

**Description**: ``Updates the logged in user``

**Access**: ``Authenticated User``

**Success Response**: ``200 (OK)``

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

- 404 - Not Found - User not found
- 400 - Bad Request - Missing fields or
  - Name must be at least 4+ characters
  - Email must be valid
- 401 - Unauthorized - User is not authenticated

---

## Get Users (All)

**Endpoint**: ``/api/users``

**Method**: ``GET``

**Description**: ``Gets all Users``

**Access**: ``Admin``

**Success Response**: ``200 (OK)``

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

- 401 - Unauthenticated - User is not authenticated
- 403 - Forbidden - User is not an admin

---

## Get Users (Single)

**Endpoint**: ``/api/users/:id``

**Method**: ``GET``

**Description**: ``Gets a User``

**Access**: ``Admin``

**Success Response**: ``200 (OK)``

```json
{
    "id": 1,
    "name": "Alex P",
    "email": "aprechte@charlotte.edu",
    "createdAt": "March 24, 2026",
    "role": "USER"
},
```

#### Error Responses

- 404 - Not Found - User not found
- 401 - Unauthenticated - User is not authenticated
- 403 - Forbidden - User is not an admin

---

## Update Role

**Endpoint**: ``/api/users/:id``

**Method**: ``PATCH``

**Description**: ``Updates a user's role``

**Access**: ``Admin``

**Success Response**: ``200 (OK)``

```json
{
    "id": 1,
    "name": "Alex P",
    "email": "aprechte@charlotte.edu",
    "createdAt": "March 24, 2026",
    "role": "ADMIN"
},
```

#### Error Responses

- 404 - Not Found - User not found
- 400 - Bad Request - Invalid Role
  - Role must be USER or ADMIN
- 401 - Unauthenticated - User is not authenticated
- 403 - Forbidden - User is not an admin

---

## Authentication Endpoints

### Login

**Endpoint**: ``/api/auth/login``

**Method**: ``POST``

**Description**: ``Log into an account``

**Access**: ``All``

**Success Response**: ``200 (OK)``

```json
{
    "accessToken": "..."
},
```

#### Error Responses

- 400 - Bad Request - Invalid Login Details
  - Email or password missing
- 401 - Unauthenticated - Incorrect Login details
  - Email or password being incorrect

---

### Sign Up

**Endpoint**: ``/api/auth/signup``

**Method**: ``POST``

**Description**: ``Create an account``

**Access**: ``All``

**Success Response**: ``200 (OK)``

```json
{
    "id": 1,
    "name": "Alex",
    "email": "alex@example.com",
    "createdAt": "March 24, 2026",
    "role": "USER"
},
```

#### Error Responses

- 400 - Bad Request - Invalid Login Details
  - Email or password missing
  - Email is not valid
  - Password must be 8+ characters
- 401 - Unauthenticated - Incorrect Login details
  - Email or password being incorrect
- 409 - Conflict - Email is already in use
