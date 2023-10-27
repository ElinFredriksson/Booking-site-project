import express from 'express'
import { getAllBookables, getBookable, createBookable } from '../models/bookableModel'


const bookableRoutes = express.Router();

bookableRoutes.get('/all', getAllBookables);
bookableRoutes.get('/:id', getBookable);
bookableRoutes.post('/', createBookable);
// router.patch('/:id', protect, updateBookable);
// router.delete('/:id', protect, deleteBookable);


export default bookableRoutes;