import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';



@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let apiKey = req.headers['x-api-key'];
        const VALID_API_KEY = process.env.API_KEY || '0';
        if (Array.isArray(apiKey)) apiKey = apiKey[0];
        const envKey = VALID_API_KEY.trim();
        const headerKey = (apiKey || '').trim();

        if (!headerKey || headerKey !== envKey) {
            throw new UnauthorizedException('API key is missing or invalid');
        }
        next();
    }
}
