const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('../../src/middleware/errorHandler');

describe('Express middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(morgan('dev'));
    app.use(express.json());

    app.get('/test', (req, res) => {
      res.status(200).send('OK');
    });

    // Error route to test errorHandler
    app.get('/error', (req, res, next) => {
      next(new Error('Test error'));
    });

    app.use(errorHandler);
  });

  test('morgan logs requests and /test route returns 200', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  test('errorHandler middleware catches errors and returns JSON error response', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server Error');
  });
});
