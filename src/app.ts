import express from 'express';
import cors from 'cors';
import bookableRoutes from './controllers/bookableController';
import reservationRoutes from './controllers/reservationController';
import userRoutes from './controllers/userController';
import likedBookableRoutes from './controllers/likedBookableController';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/bookables', bookableRoutes);
app.use('/api/reservations', reservationRoutes );
app.use('/api/users', userRoutes );
app.use('/api/likedBookables', likedBookableRoutes);

export default app;

