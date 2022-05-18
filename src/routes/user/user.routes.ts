import express from 'express';
const router = express.Router();
import * as user from './user.controller';
import UserSchema from './user.schema';

router.get('/user', user.getUserList);
router.get('/user/:id', user.getUser);

router.post('/user', UserSchema.addUser, user.addUser);

router.put('/user/:id', user.updateUser);

router.delete('/user/:id', user.deleteUser);

export = router;