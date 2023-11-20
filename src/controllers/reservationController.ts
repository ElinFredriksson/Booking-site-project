import express from 'express'
import { getAllReservations, getReservation, createReservation, updateReservation, deleteReservation, getReservationsByUser } from '../models/reservationModel'
import authenticateToken from '../middleware/authMiddleware'

const reservationRoutes = express.Router()

// By adding router.use(authenticateToken);, you're ensuring that all the routes defined after this line will be protected by the authentication middleware.
reservationRoutes.use(authenticateToken)

reservationRoutes.get('/all', getAllReservations);
reservationRoutes.get('/:id', getReservation);
reservationRoutes.get('/user/:id', getReservationsByUser);
reservationRoutes.post('/', createReservation);
reservationRoutes.patch('/:id',  updateReservation);
reservationRoutes.delete('/:id',  deleteReservation);

export default reservationRoutes;