import express from 'express'
import { getAllBookables, getBookable, createBookable, deleteBookable, updateBookable } from '../models/bookableModel'


const bookableRoutes = express.Router();

bookableRoutes.get('/all', getAllBookables);
// bookableRoutes.get('/filter', getAllBookables);
bookableRoutes.get('/:id', getBookable);
bookableRoutes.post('/', createBookable);
bookableRoutes.delete('/:id', deleteBookable);
bookableRoutes.patch('/:id', updateBookable);
// router.patch('/:id', protect, updateBookable);


export default bookableRoutes;