import { Controller, All, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy/proxy.service';
import { Request, Response } from 'express';

@Controller('api')
export class AppController {
    constructor(private readonly proxyService: ProxyService) { }

    @All('*') // Bắt tất cả phương thức và route dưới /api
    async proxy(@Req() req: Request, @Res() res: Response) {
        // Mapping path -> service URL (bạn có thể dùng config động hơn)
        const serviceMap = {
            '/auth': 'http://localhost:8001',
            '/user': 'http://localhost:4001',
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
            return res.status(err?.response?.status || 500).json({ error: err.message });
        }
    }
}
