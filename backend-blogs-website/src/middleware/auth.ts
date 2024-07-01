import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from ".././utils/enums";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from ".././services/userService";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.split(' ')[1];

    if (!jwtToken) {
        res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    } else {
        jwt.verify(jwtToken, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(HttpStatusCode.FORBIDDEN)
            }
            req.body.user = user;
            next();
        })
    }
}