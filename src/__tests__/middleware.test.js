'use strict';

// stolen with permission from  Lorenzo Antonio Ortega @ https://github.com/doc-devs/iCare/blob/dev/__tests__/authBasicMiddleWare.tests.js
const { db, users, pets, comments } = require('../models/index.js');
const middlewareBasic = require('../auth/middleware/basic.js');
const middlewareBearer = require('../auth/middleware/bearer.js');
const middlewareACL = require('../auth/middleware/acl.js');

let adminUser = {
  admin: { 
    userName: 'TheAdmin', 
    password: 'password' },
  };
  
  
// seed db with an admin user
beforeAll(async () => {
  await db.sync();
  await users.create(adminUser.admin);
});
afterAll(async () => {
  await db.drop();
})


describe('Given auth middleware', () => {

// admin:password: YWRtaW46cGFzc3dvcmQ=
// admin:foo: YWRtaW46Zm9v

const request = {};
const response = {
  status: jest.fn(() => response),
  send: jest.fn(() => response)
}
const next = jest.fn();

  describe('When Basic', () => {

    it('Then fails to login for a user (admin) with the incorrect basic credentials', () => {
      // Change the request to match this test case
      request.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };
      return middlewareBasic(request, response, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(response.status).toHaveBeenCalledWith(403);
      });
    });

    it('Then logs in an admin', () => {
      request.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };
      return middlewareBasic(request, response, next)
        .then(() => {
          expect(next).toBeTruthy();
        });
    });
  });

  // Need to work on this section
  describe('When Bearer', () => {

    it('Then fails to login for a user (admin) with the incorrect basic credentials', () => {
      // Change the request to match this test case
      request.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };
      return middlewareBearer(request, response, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
          expect(response.status).toHaveBeenCalledWith(403);
      });
    });

    it('Then logs in an admin', () => {
      request.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };
      return middlewareBearer(request, response, next)
        .then(() => {
          expect(next).toBeTruthy();
        });
    });
  });
});