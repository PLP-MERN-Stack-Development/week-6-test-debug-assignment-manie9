const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Bug = require('../../src/models/bugModel');

beforeAll(async () => {
  jest.setTimeout(60000); // Increase timeout to 60 seconds for slow DB connection
  const url = 'mongodb://127.0.0.1/mern-bug-tracker-test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  } else {
    console.warn('Mongoose connection not ready, skipping dropDatabase and close.');
  }
});

describe('Bug Routes', () => {
  let bugId;

  test('POST /api/bugs - create bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Test Bug',
        description: 'Test description',
        status: 'open',
        priority: 'high',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Bug');
    bugId = response.body._id;
  });

  test('GET /api/bugs - get all bugs', async () => {
    const response = await request(app).get('/api/bugs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/bugs/:id - get bug by id', async () => {
    const response = await request(app).get(`/api/bugs/${bugId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(bugId);
  });

  test('PUT /api/bugs/:id - update bug', async () => {
    const response = await request(app)
      .put(`/api/bugs/${bugId}`)
      .send({ status: 'closed' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('closed');
  });

  test('DELETE /api/bugs/:id - delete bug', async () => {
    const response = await request(app).delete(`/api/bugs/${bugId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Bug deleted');
  });
});
