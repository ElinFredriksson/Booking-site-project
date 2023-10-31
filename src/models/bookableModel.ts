// const Bookable = require('../schemas/bookableSchema');
import Bookable from '../schemas/bookableSchema';
import { Request, Response, NextFunction } from 'express';

export const getAllBookables = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookables = await Bookable.find();
        res.status(200).json({
            status: 'success',
            results: bookables.length,
            data: {
                bookables,
            },
        });
    } catch (err) {
        next(err);
    }
};


export const getBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookable = await Bookable.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                bookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const createBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBookable = await Bookable.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                bookable: newBookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const deleteBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBookable = await Bookable.findByIdAndDelete(req.params.id);

        if (!deletedBookable) {
            return res.status(404).json({
                status: 'fail',
                message: 'Bookable not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Bookable deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};



