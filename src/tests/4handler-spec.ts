import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the main endpoint', (done) => {
      request.get('/').expect(200);
      done();
    });
    it('gets the products endpoint', (done) => {
      request
        .get('/products')
        .expect(200);
      done();
    });
    it('gets the users endpoint', (done) => {
      request
        .get('/users')
        .expect(200);
      done();
    });
    it('gets the orders endpoint', (done) => {
      request
        .get('/orders')
        .expect(200);
      done();
    });
  });