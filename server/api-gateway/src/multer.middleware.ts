import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

const storage = multer.memoryStorage(); // lưu file trong bộ nhớ RAM

const upload = multer({ storage });

@Injectable()
export class MulterMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        // Nếu bạn không biết chính xác tên field file, có thể dùng upload.any()
        upload.any()(req, res, (err: any) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error', error: err });
            }
            next();
        });
    }
}
