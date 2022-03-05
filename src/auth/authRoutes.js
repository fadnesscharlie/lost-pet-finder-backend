'use strict';

const express = require('express');
const { users } = require('../models/index');
const basic = require('./middleware/basic');
const bearer = require('./middleware/bearer');
const permissions = require('./middleware/acl');
const authRouter = express.Router();

authRouter.post('/signup', handleCreate);
authRouter.post('/signin', basic, handleSignin);
authRouter.get('/users', bearer, permissions('delete'), handleGetAll);
authRouter.put('/users/:id', bearer, permissions('delete'), handleUpdate);
authRouter.delete('/users/:id', bearer, permissions('delete'), handleDelete);

async function handleCreate (req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
};

function handleSignin (req, res, next) {
  const user = {
    user: req.user,
  };
  res.status(200).json(user);
};

async function handleGetAll (req, res, next) {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user =>
    `User/Username: ${user.username}, User Role: ${user.role}, ID: ${user.userID}`);
  res.status(200).json(list);
};

async function handleUpdate (req, res, next) {
  const userID = req.params.id;
  let obj = req.body;
  let updatedRecord = await users.findOne({ where: { userID } })
    .then(record => record.update(obj));
  res.status(200).json(updatedRecord);
};

async function handleDelete (req, res, next) {
  const userID = req.params.id;
  const deletedUser = await users.destroy({where: { userID }});
  res.status(200).json(`User Deleted ${deletedUser}`);
};

module.exports = authRouter;
