import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services';

class userController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const {email} = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {

            const {page = 1, perPage = 25, ...other} = req.query;

            const userPagination = await userService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
