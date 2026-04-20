import request from 'supertest';
import app from '../src/server.js';
const randUserInfo = {
  email: `example-${crypto.randomUUID().slice(0, 5)}@example.com`,
  password: 'password123',
};
const userObject = expect.objectContaining({
  id: expect.any(Number),
  email: randUserInfo.email,
  createdAt: expect.stringMatching(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, // ISO8601 Format
  ),
});
const loginObject = expect.objectContaining({
  accessToken: expect.any(String),
});
describe('Test User Signup', () => {
  it('POST /auth/signup should return a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(randUserInfo)
      .set({ 'Content-Type': 'application/json' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toEqual(userObject);
  });
  it('POST /auth/signup fails with invalid details', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'bademail', password: 'abc' })
      .set({ 'Content-Type': 'application/json' });
    expect(res.statusCode).toBe(400);
  });
  it('POST /auth/signup fails with email conflict', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(randUserInfo)
      .set({ 'Content-Type': 'application/json' });
    expect(res.statusCode).toBe(409);
  });
});
describe('Test User Login', () => {
  it('POST /api/auth/login returns an access token with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(randUserInfo)
      .set({ 'Content-Type': 'application/json' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toEqual(loginObject);
    userToken = res.body.accessToken;
  });
  it('POST /api/auth/login fails with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: `example-${crypto.randomUUID().slice(0, 10)}@email.com`,
        password: 'abcdef123',
      })
      .set({ 'Content-Type': 'application/json' });
    expect(res.statusCode).toBe(401);
  });
  it('POST /api/auth/login fails with bad user data', async () => {
    const res = await request(app).post('/api/auth/login');
    expect(res.statusCode).toBe(400);
  });
});
