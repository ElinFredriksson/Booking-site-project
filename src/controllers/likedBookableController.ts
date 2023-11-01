import express from 'express';
import { getAllLikedBookables, getLikedBookablesByUser, likeBookable, unlikeBookable } from '../models/likedBookableModel';

const likedBookablerouter = express.Router();

likedBookablerouter.get('/likedBookables', getAllLikedBookables);
likedBookablerouter.get('/likedBookables/:userId', getLikedBookablesByUser);
likedBookablerouter.post('/likedBookables', likeBookable);
likedBookablerouter.delete('/likedBookables/:userId/:bookableId', unlikeBookable);

export default likedBookablerouter;
