import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    console.log(
      'Request URL: ',
      req.url,
      ' method: ',
      req.method,
      ' response: ',
      res.statusCode,
    );
    next();
  }
}
