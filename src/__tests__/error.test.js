'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const { error, message } = require('../error-handlers/404.js');
// const { error, message } = require('../error-handlers/500.js');
const request = supertest(server);

describe('Given /bad', () => {
  describe('When GET', () => {
    it('Then returns a 400 status', async () => {
      const response = await request.get('/bad');
      expect(response.status).toEqual(404);
    });

    // it('Then returns correct response body', async () => {
    //   const response = await request.get('/bad');
    //   expect(response.text).toEqual('You have reached the Wizard!');
    // });
  })
})