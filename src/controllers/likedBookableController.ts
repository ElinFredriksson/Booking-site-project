import express from 'express';
import { getAllLikedBookables, getLikedBookablesByUser, likeBookable, unlikeBookable } from '../models/likedBookableModel';

const likedBookablerouter = express.Router();

likedBookablerouter.get('/', getAllLikedBookables);
likedBookablerouter.get('/:userId', getLikedBookablesByUser);
likedBookablerouter.post('/', likeBookable);
likedBookablerouter.delete('/:userId/:bookableId', unlikeBookable);

export default likedBookablerouter;
