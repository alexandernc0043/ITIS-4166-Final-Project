import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';
const isDev = process.env.NODE_ENV === 'development';

try {
  if (isDev) {
    await prisma.$queryRaw`TRUNCATE books, authors, users, reviews RESTART IDENTITY CASCADE;`;
    console.log('[DEVELOPMENT] Database truncated');
  }

  const usersData = [
    { email: 'example@example.com', password: 'examplePassword' },
    { email: 'johnDoe@email.com', password: 'johndoe1234' },
    { email: 'janedoe@email.com', password: 'janedoe1234' },
    { email: 'admin@admin.com', password: 'adminpassword', role: 'ADMIN' },
  ];
  const users = [];
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    usersData.forEach(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'USER',
        },
      });
      users.push(user);
    });
  } else {
    console.log('[SEED] Users found in database skipping');
  }

  const authorData = [
    { name: 'Alex Prechtel' },
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Bob Smith' },
  ];
  await prisma.author.createMany(authorData);

  const bookData = [
    {
      name: 'The Very Hungry Caterpillar',
      price: 9.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
    {
      name: 'Booky Book',
      price: 19.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
    {
      name: 'Booky Book 2',
      price: 19.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
    {
      name: 'Book the Book',
      price: 19.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
    {
      name: 'Book the Book 2',
      price: 19.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
    {
      name: 'Book the Book 3',
      price: 19.99,
      published: '2026-03-29',
      authorId: Math.floor(Math.random() * 4) + 1,
    },
  ];
  await prisma.book.createMany(bookData);

  const reviewData = [
    {
      rating: Math.floor(Math.random() * 5) + 1,
      content:
        'deserunt eiusmod reprehenderit voluptate velit ad sunt labore dolor tempor',
      userId: Math.floor(Math.random() * 4) + 1,
      bookId: Math.floor(Math.random() * 4) + 1,
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      content:
        'deserunt eiusmod reprehenderit voluptate velit ad sunt labore dolor tempor',
      userId: Math.floor(Math.random() * 4) + 1,
      bookId: Math.floor(Math.random() * 4) + 1,
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      content:
        'deserunt eiusmod reprehenderit voluptate velit ad sunt labore dolor tempor',
      userId: Math.floor(Math.random() * 4) + 1,
      bookId: Math.floor(Math.random() * 4) + 1,
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      content:
        'deserunt eiusmod reprehenderit voluptate velit ad sunt labore dolor tempor',
      userId: Math.floor(Math.random() * 4) + 1,
      bookId: Math.floor(Math.random() * 4) + 1,
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      content:
        'deserunt eiusmod reprehenderit voluptate velit ad sunt labore dolor tempor',
      userId: Math.floor(Math.random() * 4) + 1,
      bookId: Math.floor(Math.random() * 4) + 1,
    },
  ];
  await prisma.review.createMany(reviewData);

  // users.forEach(async (user) => {
  //   await prisma.review.createMany({
  //     data: [{ userId: user.id }],
  //   });
  // });
} catch (e) {
  console.error('seed failed: ', e);
}
