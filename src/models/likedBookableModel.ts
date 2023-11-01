import LikedBookable from '../schemas/likedBookableSchema';
import { Request, Response, NextFunction } from 'express';

export const getAllLikedBookables = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likedBookables = await LikedBookable.find();
        res.status(200).json({
            status: 'success',
            results: likedBookables.length,
            data: {
                likedBookables,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getLikedBookablesByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likedBookables = await LikedBookable.find({ user: req.params.userId })
            .populate('bookable'); // Populate the bookable details

        res.status(200).json({
            status: 'success',
            results: likedBookables.length,
            data: {
                likedBookables,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const likeBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, bookable } = req.body;

        const newLikedBookable = await LikedBookable.create({
            user,
            bookable,
        });

        res.status(201).json({
            status: 'success',
            data: {
                likedBookable: newLikedBookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const unlikeBookable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedLikedBookable = await LikedBookable.findOneAndDelete({
            user: req.params.userId,
            bookable: req.params.bookableId,
        });

        if (!deletedLikedBookable) {
            return res.status(404).json({
                status: 'fail',
                message: 'Liked Bookable not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Liked Bookable removed successfully',
        });
    } catch (err) {
        next(err);
    }
};
