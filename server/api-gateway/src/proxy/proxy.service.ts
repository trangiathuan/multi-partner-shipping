import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as FormData from 'form-data';

@Injectable()
export class ProxyService {
    constructor(private readonly httpService: HttpService) { }

    async forwardRequest(serviceUrl: string, req: any): Promise<any> {
        const method = req.method.toLowerCase();
        const url = `${serviceUrl}${req.url.replace(/^\/api/, '')}`;

        // Clone và chỉnh sửa headers
        const headers = { ...req.headers };
        delete headers['host']; // bỏ host tránh lỗi

        let data = req.body;

        // Nếu có file(s), tạo FormData
        if (req.files && req.files.length > 0) {
            const formData = new FormData();

            // Thêm fields thường (form fields)
            for (const key in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                    formData.append(key, req.body[key]);
                }
            }

            // Thêm file(s)
            req.files.forEach((file) => {
                formData.append(file.fieldname, file.buffer, {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    knownLength: file.size,
                });
            });

            data = formData;
            // Gán lại đúng header content-type từ formData
            headers['content-type'] = `multipart/form-data; boundary=${formData.getBoundary()}`;
        }

        const response$ = this.httpService.request({
            method,
            url,
            headers,
            data,
            // Quan trọng: đối với multipart/form-data, phải để transformRequest mặc định (axios) mới gửi đúng
            // Nếu cần, bạn có thể thêm timeout, validateStatus, ...
        });

        const response = await lastValueFrom(response$);
        return response.data;
    }
}
