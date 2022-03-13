'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const { error, message } = require('../error-handlers/404.js');
const request = supertest(server);

describe('Given /bad', () => {
  describe('When GET', () => {
    it('Then returns a 404 status', async () => {
      const response = await request.get('/tomato');
      expect(response.status).toEqual(404);
    });
  })
})

describe('Given /comment-info', () => {
  describe('When GET', () => {
    it('Then returns a 500 status', async () => {
      const response2 = await request.post('/comment-info');
      console.log('response2 ---------------', response2.status);
      expect(response2.status).toEqual(404);
    });

    
  })
})
