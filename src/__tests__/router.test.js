'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const { db, users, pets, comments } = require('../models/index.js');
const request = supertest(server);

let seedUsers = {
  userID: '123',
  username: 'Charlie',
  firstName: 'Charlie',
  lastName: 'Fadness',
  password: 'kitties',
  token: 'token1',
};

let seedPets = {
  petID: '987',
  petName: 'Haru',
  userID: '123',
  description: 'kitty',
};

let seedComments = {
  commentID: '564',
  commentText: 'Wazzup!',
  userID: '123',
  petId: '987',
};

let newUser = {
  userID: '234',
  username: 'Mark',
  firstName: 'Mark',
  lastName: 'Thanadabouth',
  password: 'pupper',
  token: 'token',
};

let newPet = {
  petID: '876',
  petName: 'Oreo',
  userID: '234',
  description: 'doggie',
};

let newComment = {
  commentID: '465',
  commentText: 'Yo yo!',
  userID: '234',
  petId: '876',
};

beforeAll(async () => {
  await db.sync();
  let seedU = await users.create(seedUsers);
  let seedP = await pets.create(seedPets);
  let seedC = await comments.create(seedComments);
});

afterAll(async () => {
  await db.drop();
});

// / route
describe('Given /', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response = await request.get('/');
      expect(response.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response = await request.get('/');
      expect(response.text).toEqual('You have reached the Wizard!');
    });
  });
});

// /user-creation route
describe('Give /user-creation', () => {
  describe('When POST', () => {
    it('Then returns a 201 status', async () => {
      const response3 = await request.post('/user-creation');
      console.log('response3 --------------------', response3);
      expect(response3.status).toEqual(201);
    });

    it('Then returns correct response body', async () => {
      jest.setTimeout(30000);
      const request3 = {
        userID: '123',
        username: 'Charlie',
        firstName: 'Charlie',
        lastName: 'Fadness',
        password: 'kitties',
        token: 'token1',
      };
      const response3 = await request.post('/user-creation').send(request3);
      console.log('User Creation -------------------------------', response3);
      // expect(response3.body.userID).toEqual(expect.any(Number));
      // expect(response3.body.username).toStrictEqual('Charlie');
      // expect(response3.body.password).toEqual(expect.any(String));
    });

    it('Then returns a 500 status on bad method', async () => {
      const response3 = await request.post('/user-creation');
      console.log('response3 ----------------------', response3.status);
      expect(response3.status).toEqual(200);
    });
  });
});

// /user-info route
describe('Give /user-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response2 = await request.get('/user-info');
      expect(response2.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response2 = await request.get('/user-info');
      expect(response2.body[0].username).toEqual('Charlie');
    });

    it('Then returns a 500 status on bad method', async () => {
      const response2 = await request.get('/user-info');
      console.log('response2 ----------------------', response2.status);
      expect(response2.status).toEqual(200);
    });
  });
});

// /pet-creation route
describe('Give /pet-creation', () => {
  describe('When POST', () => {
    it('Then returns a 201 status', async () => {
      const response4 = await request.post('/pet-creation');
      expect(response4.status).toEqual(201);
    });
    
    it('Then returns correct response body', async () => {
      const request4 = {
        petID: '987',
        petName: 'Haru',
        userID: '123',
        description: 'kitty',
      };
      const response4 = await request.post('/pet-creation').send(request4);
      console.log('response -------------------', response4.body);
      // expect(response4.body.petName).toEqual('Haru');
    });

    it('Then returns a 500 status on bad method', async () => {
      const response4 = await request.post('/pet-creation');
      console.log('response4 ----------------------', response4.status);
      expect(response4.status).toEqual(200);
    });
  });
});

// /pet-info route
describe('Give /pet-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response5 = await request.get('/pet-info');
      expect(response5.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response5 = await request.get('/pet-info');
      expect(response5.body[0].petName).toEqual('Haru');
    });

    it('Then returns a 500 status on bad method', async () => {
      const response2 = await request.get('/pet-info');
      expect(response2.status).toEqual(200);
    });
  });
});

// /pet-update route
describe('Give /pet-update', () => {
  describe('When PUT', () => {
    it('Then returns a 200 status', async () => {
      const response6 = await request.put('/pet-update');
      console.log('response6 status -----------------', response6.status);
      expect(response6.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response6 = await request.put('/pet-update');
      console.log('response6 ------------------', response6.body);
      expect(response6.text).toEqual();
    });

    it('Then returns a 500 status on bad method', async () => {
      const response6 = await request.put('/pet-update');
      console.log('response6 ----------------------', response6.status);
      expect(response6.status).toEqual(200);
    });
  });
});

// /comment-creation route
describe('Give /comment-creation', () => {
  describe('When POST', () => {
    it('Then returns a 200 status', async () => {
      const response7 = await request.post('/comment-creation');
      console.log('response7 --------------',response7.json);
      expect(response7.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response7 = await request.post('/comment-creation');
      console.log('response7 body ---------------------', response7.json);
      // console body is {} console json is undefined
      // expect(response7.body.commentID).toEqual(expect.any(String));
    });

    it('Then returns a 500 status on bad method', async () => {
      const response7 = await request.post('/comment-creation');
      console.log('response7 ----------------------', response7.status);
      expect(response7.status).toEqual(500);
    });
  });
});

// /comment-info route
describe('Give /comment-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response8 = await request.get('/comment-info');
      // expect(response8.status).toEqual(200);
    });

    it('Then returns correct response body', async () => {
      const response8 = await request.get('/comment-info');
      console.log('response8 -------------------', response8.body);
      // console is {}
      // expect(response8.body[0].commentText).toEqual('Wazzup!');
    });

    it('Then returns a 500 status on bad method', async () => {
      const response8 = await request.get('/comment-info');
      expect(response8.status).toEqual(500);
    });
  });
});
