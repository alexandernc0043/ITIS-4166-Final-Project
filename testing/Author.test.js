import request from 'supertest';
import app from '../src/server.js';

const ISO8601FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const adminUserInfo = {
  email: 'admin@admin.com',
  password: 'adminpassword',
};
let adminToken;
const authorFields = {
  id: expect.any(Number),
  name: expect.any(String),
};

const bookFields = {
  id: expect.any(Number),
  name: expect.any(String),
  price: expect.any(Number),
  published: expect.stringMatching(ISO8601FORMAT),
  authorId: expect.any(Number),
};

const authorObject = expect.objectContaining(authorFields);
const bookObject = expect.objectContaining(bookFields);

describe('Test Get Author', () => {
  it('GET /api/authors returns a list of authors', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toEqual(expect.arrayContaining([authorObject]));
  });

  it('GET /api/authors/:id returns a single author', async () => {
    const res = await request(app).get('/api/authors/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toEqual(authorObject);
  });

  it('GET /api/authors/:id fails with an invalid id', async () => {
    const res = await request(app).get('/api/authors/a');
    expect(res.statusCode).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('GET /api/authors/:id fails with an nonexistent author', async () => {
    const res = await request(app).get('/api/authors/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('GET /api/authors/:id/books returns an author with books array', async () => {
    const res = await request(app).get('/api/authors/1/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        ...authorFields,
        books: expect.any(Array),
      }),
    );

    const { books } = res.body;
    expect(
      books.length === 0 ||
        books.every((book) => bookObject.asymmetricMatch(book)),
    ).toBe(true);
  });
});

describe('Test Update author', () => {
  it('PUT /api/authors/:id should return an updated author', async () => {
    const res = await request(app)
      .put('/api/authors/1')
      .send({
        name: 'Updated Author Name',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(authorObject);
  });
  it('PUT /api/authors/:id should fail with invalid author data', async () => {
    const res = await request(app)
      .put('/api/authors/1')
      .send({
        name: 'abc',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      });
    expect(res.statusCode).toBe(400);
  });
  it('PUT /api/auhtors/:id fails with invalid id', async () => {
    const res = await request(app)
      .put('/api/authors/a')
      .send({
        name: 'abcdef',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      });
    expect(res.statusCode).toBe(400);
  });
  it('PUT /api/auhtors/:id fails with nonexistent author', async () => {
    const res = await request(app)
      .put('/api/authors/99999')
      .send({
        name: 'abcdef',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      });
    expect(res.statusCode).toBe(404);
  });
});

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send(adminUserInfo)
    .set({ 'Content-Type': 'application/json' });
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.objectContaining({ accessToken: expect.any(String) }),
  );
  adminToken = res.body.accessToken;
});
