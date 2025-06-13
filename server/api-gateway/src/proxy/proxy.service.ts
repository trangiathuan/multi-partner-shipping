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
        // Lấy ngày giờ Việt Nam (UTC+7)
        const now = new Date();
        const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        const vnTimeStr = vnTime.toISOString().replace('T', ' ').substring(0, 19);
        console.log(`[${vnTimeStr}] [${method.toUpperCase()}] request to: ${url}`);


        // Clone và chỉnh sửa headers
        const headers = { ...req.headers };
        delete headers['host']; // bỏ host tránh lỗi
        delete headers['content-length']; // xóa content-length để axios tự set lại

        let data = req.body;

        // Nếu có file(s), tạo FormData
        if (req.files && req.files.length > 0) {
            const formData = new FormData();

            // Thêm fields thường (form fields)
            for (const key in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                    // Nếu là mảng (nhiều file cùng fieldname), append từng phần tử
                    if (Array.isArray(req.body[key])) {
                        req.body[key].forEach((v: any) => formData.append(key, v));
                    } else {
                        formData.append(key, req.body[key]);
                    }
                }
            }

            // Thêm file(s)
            req.files.forEach((file: any) => {
                formData.append(file.fieldname, file.buffer, {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    knownLength: file.size,
                });
            });

            data = formData;
            // Để FormData tự set content-type, xóa content-type cũ nếu có
            delete headers['content-type'];
            Object.assign(headers, formData.getHeaders());
        }

        const response$ = this.httpService.request({
            method,
            url,
            headers,
            data,

        });

        const response = await lastValueFrom(response$);
        return response.data;
    }
}
