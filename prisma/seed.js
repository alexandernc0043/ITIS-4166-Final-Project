import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE books, authors, users, reviews RESTART IDENTITY CASCADE;`;
  const usersData = [
    { email: 'example@example.com', password: 'examplePassword' },
    { email: 'johnDoe@email.com', password: 'johndoe1234' },
    { email: 'janedoe@email.com', password: 'janedoe1234' },
    { email: 'admin@admin.com', password: 'adminpassword', role: 'ADMIN' },
  ];
  const users = [];
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

  users.forEach(async (user) => {
    await prisma.review.createMany({
      data: [{ userId: user.id }],
    });
  });
} catch (e) {}
