'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const { db, users, pets, comments, markers } = require('../models/index.js');
const request = supertest(server);

let seedUsers = {
	username: 'username',
	email: 'username',
	password: 'username',
	role: 'editor',
};

let seedPets = {
	petID: '987',
	petName: 'Haru',
	userID: '123',
	description: 'kitty',
};

let seedComments = {
	commentText: 'comment',
	userID: 'e0e5c2a5-2a50-4dc3-a397-140bdf59a713',
	petId: 'e0e5c2a5-2a50-4dc3-a397-140bdf59a713',
};

let seedMarker = {
	lat: 47.6038321,
	lng: 122.330062,
	petID: 'Pet Id Here',
	time: 'Date here',
};

let newUser = {
	username: 'username2',
	email: 'username2',
	password: 'username2',
	role: 'editor',
};

let newMarker = {
	lat: 43.6038321,
	lng: 132.330062,
	petID: 'Pet Id Here2',
	time: 'Date here2',
};

beforeAll(async () => {
	await db.sync();
	let seedU = await users.create(seedUsers);
	let seedP = await pets.create(seedPets);
	let seedC = await comments.create(seedComments);
	let seedM = await markers.create(seedMarker);
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
			const response3 = await request.post('/user-creation').send(newUser);
			expect(response3.status).toEqual(201);
		});

		it('Then returns a 404 status on bad method', async () => {
			const response3 = await request.put('/user-creation');
			expect(response3.status).toEqual(404);
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
			expect(response2.body[0].username).toEqual('username');
		});

		it('Then returns a 404 status on bad method', async () => {
			const response2 = await request.delete('/user-info');
			expect(response2.status).toEqual(404);
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
				petName: 'Haru',
				userID: 'e0e5c2a5-2a50-4dc3-a397-140bdf59a713',
				description: 'cute',
				age: 3,
				breed: 'awesome',
				isLost: true,
				medicalConditions: 'none',
				trackerChip: true,
				lostOrFound: true,
				reward: 22,
			};
			const response4 = await request.post('/pet-creation').send(request4);
			expect(response4.body.petName).toEqual('Haru');
		});

		it('Then returns a 404 status on bad method', async () => {
			const response4 = await request.delete('/pet-creation');
			expect(response4.status).toEqual(404);
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

// /comment-creation route
describe('Give /comment-creation', () => {
	describe('When POST', () => {
		it('Then returns a 200 status', async () => {
			const response7 = await request.post('/comment-creation');
			expect(response7.status).toEqual(200);
		});

		it('Then returns correct response body', async () => {
			const response7 = await request.post('/comment-creation');
			expect(response7.body.commentID).toEqual(expect.any(String));
		});

		it('Then returns a 404 status on bad method', async () => {
			const response7 = await request.delete('/comment-creation');
			expect(response7.status).toEqual(404);
		});
	});
});

// /comment-info route
describe('Give /comment-info', () => {
	describe('When GET', () => {
		it('Then returns a 200 status', async () => {
			const response8 = await request.get('/comment-info');
			expect(response8.status).toEqual(200);
		});

		it('Then returns correct response body', async () => {
			const response8 = await request.get('/comment-info');
			expect(response8.body[0].commentText).toEqual('comment');
		});

		it('Then returns a 404 status on bad method', async () => {
			const response8 = await request.delete('/comment-info');
			expect(response8.status).toEqual(404);
		});
	});
});

//  Marker Routes
describe('Give /markers', () => {
	describe('When GET', () => {
		it('Should return a 200 status', async () => {
			const response6 = await request.get('/markers');
			expect(response6.status).toEqual(200);
		});

		it('Then returns correct response body', async () => {
			const response6 = await request.get('/markers');
			expect(response6.body[0].lat).toEqual(expect.any(Number));
		});

		it('Then returns a 404 status on bad method', async () => {
			const response6 = await request.put('/markers');
			expect(response6.status).toEqual(404);
		});
	});
});

// marker route
describe('Give /markers', () => {
	describe('When POST', () => {
		it('Then returns a 200 status', async () => {
			const response6 = await request.post('/markers');
			expect(response6.status).toEqual(200);
		});

		it('Then returns correct response body', async () => {
			const response6 = await request.post('/markers').send(newMarker);
			expect(response6.body.petID).toEqual(expect.any(String));
		});

		it('Then returns a 404 status on bad method', async () => {
			const response6 = await request.put('/markers');
			expect(response6.status).toEqual(404);
		});
	});
});