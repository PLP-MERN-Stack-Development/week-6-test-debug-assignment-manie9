const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/mern-bug-tracker-test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Bug Routes Edge Cases', () => {
  test('GET /api/bugs/:id with invalid id returns 400', async () => {
    const response = await request(app).get('/api/bugs/invalid-id');
    expect(response.statusCode).toBe(400);
  });

  test('GET /api/bugs/:id with non-existent id returns 404', async () => {
    const response = await request(app).get('/api/bugs/507f1f77bcf86cd799439012'); // Ensure this ID does not exist
    expect(response.statusCode).toBe(404);
  });

  test('PUT /api/bugs/:id with invalid id returns 400', async () => {
    const response = await request(app)
      .put('/api/bugs/invalid-id')
      .send({ status: 'closed' });
    expect(response.statusCode).toBe(400);
  });

  test('PUT /api/bugs/:id with non-existent id returns 404', async () => {
    const response = await request(app)
      .put('/api/bugs/507f1f77bcf86cd799439012') // Ensure this ID does not exist
      .send({ status: 'closed' });
    expect(response.statusCode).toBe(404);
  });

  test('DELETE /api/bugs/:id with invalid id returns 400', async () => {
    const response = await request(app).delete('/api/bugs/invalid-id');
    expect(response.statusCode).toBe(400);
  });

  test('DELETE /api/bugs/:id with non-existent id returns 404', async () => {
    const response = await request(app).delete('/api/bugs/507f1f77bcf86cd799439012'); // Ensure this ID does not exist
    expect(response.statusCode).toBe(404);
  });
});
