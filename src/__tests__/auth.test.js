'use strict';

// const supertest = require('supertest');
const { server } = require('../server');
const { db, users, pets, comments } = require('../models/index.js');
const middlewareBasic = require('../auth/middleware/basic.js');
const middlewareBearer = require('../auth/middleware/bearer.js');
const middlewareACL = require('../auth/middleware/acl.js');
// const request = supertest(server);

let admin = {
  admin: { userName: 'TheAdmin', password: 'password' },
};

const req = {};
const res = {
  status: jest.fn(() => res),
  send: jest.fn(() => res)
}
const next = jest.fn();

// seed db with an admin user
beforeAll(async (done) => {
  await db.sync();
  await users.create(admin.admin);
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
})


describe('Given auth middleware', () => {
  describe('When Basic', () => {
    it('Then logs in an admin', () => {
      req.headers = {
        authorization: 'Basic ',
      };
      return middlewareBasic(req, res, next)
        .then(() => {
          expect(next).toHaveBenCalledWith();
        });
    })
  })

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v


}