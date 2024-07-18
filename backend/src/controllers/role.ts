import { Request, Response } from 'express';
import { Role } from '../models/role';

export const newRole = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const role = await Role.create(body);
        res.status(201).json({
            msg: 'New Role Created',
            role
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error Creating Role',
            error
        });
    }
};