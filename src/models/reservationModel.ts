// const Reservation = require('../schemas/reservationSchema');
import Reservation from '../schemas/reservationSchema';
// const Bookable = require('../schemas/bookableSchema');
import Bookable from '../schemas/bookableSchema';
// const User = require('../schemas/userSchema');
import User from '../schemas/userSchema';
import { Request, Response, NextFunction } from 'express';

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                reservations,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('bookable_id') 
            .populate('user_id'); 

        res.status(200).json({
            status: 'success',
            results: reservation ? 1 : 0, // Check if reservation exists
            data: {
                reservation,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newReservation = await Reservation.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                reservation: newReservation,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: 'success',
            data: {
                reservation,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};

export const getReservationsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find({ user_id: req.params.id })
            .populate('bookable_id') // Populating the bookable reference
            .populate('user_id'); // Populating the user reference

        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                reservations,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getReservationsByBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find({
            bookable_id: req.params.id,
        });
        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                reservations,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getReservationsByUserAndBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find({
            user_id: req.params.userId,
            bookable_id: req.params.bookableId,
        });
        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                reservations,
            },
        });
    } catch (err) {
        next(err);
    }
};

