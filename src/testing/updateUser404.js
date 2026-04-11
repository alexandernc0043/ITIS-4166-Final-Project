const URL = 'http://localhost:8080/api';

const ADMIN_CREDS = {
  email: 'admin@admin.com',
  password: 'adminpassword',
};

const randomUser = () => {
  const uid = crypto.randomUUID();
  return {
    email: `user-${uid.slice(0, 5)}@example.com`,
    password: uid.slice(0, 10),
  };
};

const post = (path, body, token) =>
  fetch(URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

const put = (path, body, token) =>
  fetch(URL + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

const del = (path, token) =>
  fetch(URL + path, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

// ── 1. Sign up regular user ───────────────────────────────────────────────────
console.log('Creating regular user...');
const regularCreds = randomUser();
const signupData = await post('/auth/signup', regularCreds);
const regularId = signupData.id;
console.log(`  Regular user ID: ${regularId}`);

// ── 2. Log in as regular user ─────────────────────────────────────────────────
console.log('Logging in as regular user...');
const regularData = await post('/auth/login', regularCreds);
const regularToken = regularData.accessToken;

// ── 3. Log in as admin ────────────────────────────────────────────────────────
console.log('Logging in as admin...');
const adminData = await post('/auth/login', ADMIN_CREDS);
const adminToken = adminData.accessToken;

// ── 4. Admin deletes regular user ─────────────────────────────────────────────
// ── 4. Admin deletes regular user ─────────────────────────────────────────────
console.log('Admin deleting regular user...');
const deleteRes = await fetch(URL + `/users/${regularId}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${adminToken}` },
});
console.log(`  Delete status: ${deleteRes.status}`);
console.log(`  Delete response:`, await deleteRes.json());

// ── 5. Deleted user attempts to update themselves ─────────────────────────────
console.log('Deleted user attempting PUT /users/me...');
const updateRes = await put(
  '/users/me',
  { email: 'newemail@example.com' },
  regularToken,
);
console.log(`  Status: ${updateRes.status}`);
console.log(`  Response:`, await updateRes.json());

// ── 6. Assert expected failure ────────────────────────────────────────────────
const expected = [401, 403, 404];
if (!expected.includes(updateRes.status)) {
  throw new Error(
    `Test failed: expected ${expected.join('/')}, got ${updateRes.status}`,
  );
}
console.log('Test passed: deleted user was correctly rejected.');
