import { Controller, All, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy/proxy.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AppController {
    constructor(
        private readonly proxyService: ProxyService,
        private readonly configService: ConfigService
    ) { }

    @All('*') // Bắt tất cả phương thức và route dưới /api
    async proxy(@Req() req: Request, @Res() res: Response) {
        // Mapping path -> service URL (dùng biến môi trường)
        const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
        //const userServiceUrl = 'http://localhost:8001'

        const serviceMap = {
            '/auth': userServiceUrl, // Sử dụng biến môi trường nếu cần
            '/user': userServiceUrl,
            '/shipment': 'http://localhost:4002',
            '/partner': 'http://localhost:4003',
            '/tracking': 'http://localhost:4004',
            '/payment': 'http://localhost:4005',
            '/reconciliation': 'http://localhost:4006',
            '/notification': 'http://localhost:4007',
        };

        const segments = req.path.split('/'); // ['', 'api', 'auth', 'login']
        const path = segments[2]; // 'auth'
        const serviceUrl = serviceMap[`/${path}`];

        if (!serviceUrl) return res.status(404).json({ error: 'Service not found' });

        try {
            const data = await this.proxyService.forwardRequest(serviceUrl, req);
            return res.json(data);
        } catch (err) {
            console.log('Proxy error:', err?.response?.data || err);
            const status = err?.response?.status || 500;
            const data = err?.response?.data || { error: err.message };
            return res.status(status).json(data);
        }
    }
}
