import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

const storage = multer.memoryStorage(); // lưu file trong bộ nhớ RAM
const upload = multer({ storage });

@Injectable()
export class MulterMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        // Chỉ xử lý nếu là multipart/form-data
        if (req.is('multipart/form-data')) {
            upload.any()(req, res, (err: any) => {
                if (err) {
                    return res.status(400).json({ message: 'File upload error', error: err });
                }
                next();
            });
        } else {
            next();
        }
    }
}
