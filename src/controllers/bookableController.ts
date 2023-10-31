import express from 'express'
import { getAllBookables, getBookable, createBookable, deleteBookable } from '../models/bookableModel'


const bookableRoutes = express.Router();

bookableRoutes.get('/all', getAllBookables);
bookableRoutes.get('/:id', getBookable);
bookableRoutes.post('/', createBookable);
bookableRoutes.delete('/:id', deleteBookable);
// router.patch('/:id', protect, updateBookable);


export default bookableRoutes;