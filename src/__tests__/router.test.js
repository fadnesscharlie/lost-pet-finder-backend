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
  token: 'token1'
}

let seedPets = {
  petID: '987',
  petName: 'Haru',
  userID: '123',
  description: 'kitty',
}

let seedComments = {
  commentID: '564',
  commentText: 'Wazzup!', 
  userID: '123', 
  petId: '987'
}

let newUser = {
  userID: '234',
  username: 'Mark',
  firstName: 'Mark',
  lastName: 'Thanadabouth',
  password: 'pupper',
  token: 'token'
}

let newPet = {
  petID: '876',
  petName: 'Oreo',
  userID: '234',
  description: 'doggie',
}

let newComment = {
  commentID: '465',
  commentText: 'Yo yo!', 
  userID: '234', 
  petId: '876',
}

beforeAll(async () => {
  await db.sync();
  let seedU = await users.create(seedUsers)
  let seedP = await pets.create(seedPets)
  let seedC = await comments.create(seedComments)
  console.log('seedU:', seedU)
  console.log('seedP:', seedP)
  console.log('seedC:', seedC)
  // done();
});

afterAll(async () => {
  await db.drop();
  // done();
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
  })
})

// /user-info route
describe('Give /user-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response2 = await request.get('/user-info');
      expect(response2.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response2 = await request.get('/user-info');
      expect(response2.text).toEqual('Get User Error');
    });
  })
})

// /user-creation route
describe('Give /user-creation', () => {
  describe('When POST', () => {
    it('Then returns a 201 status', async () => {
      const response3 = await request.post('/user-creation');
      expect(response3.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response3 = await request.post('/user-creation');
      expect(response3.text).toEqual('Create User Error');
    });
  })
})

// /pet-creation route
describe('Give /pet-creation', () => {
  describe('When POST', () => {
    it('Then returns a 200 status', async () => {
      const response4 = await request.post('/pet-creation');
      expect(response4.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response4 = await request.post('/pet-creation');
      expect(response4.text).toEqual('Create Pet Error');
    });
  })
})

// /pet-info route
describe('Give /pet-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response5 = await request.get('/pet-info');
      expect(response5.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response5 = await request.get('/pet-info');
      expect(response5.text).toEqual('Get Pet Error');
    });
  })
})

// /pet-update route
describe('Give /pet-update', () => {
  describe('When PUT', () => {
    it('Then returns a 200 status', async () => {
      const response6 = await request.put('/pet-update');
      expect(response6.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response6 = await request.put('/pet-update');
      expect(response6.text).toEqual('Update Error');
    });
  })
})

// /comment-creation route
describe('Give /comment-creation', () => {
  describe('When POST', () => {
    it('Then returns a 200 status', async () => {
      const response7 = await request.post('/comment-creation');
      expect(response7.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response7 = await request.post('/comment-creation');
      expect(response7.text).toEqual('Create Comment Error');
    });
  })
})

// /comment-info route
describe('Give /comment-info', () => {
  describe('When GET', () => {
    it('Then returns a 200 status', async () => {
      const response8 = await request.get('/comment-info');
      expect(response8.status).toEqual(200);
    })

    it('Then returns correct response body', async () => {
      const response8 = await request.get('/comment-info');
      expect(response8.text).toEqual('Get Comment Error');
    });
  })
})