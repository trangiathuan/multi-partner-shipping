import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) throw new UnauthorizedException('No token provided');

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            (req as any).user = decoded;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
