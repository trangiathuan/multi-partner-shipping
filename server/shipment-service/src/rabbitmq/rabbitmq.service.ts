import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, retry } from 'rxjs';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    ) { }

    async sendMessage(pattern: string, data: any): Promise<any> {
        console.log(`Sending message to pattern: ${pattern}`, data);
        try {
            return await firstValueFrom(
                this.client.send(pattern, data).pipe(
                    retry({ count: 3, delay: 1000 }) // Thử lại 3 lần, mỗi lần cách nhau 1 giây
                )
            );
        } catch (error) {
            console.error(`Error sending message to ${pattern}:`, error);
            throw error;
        }
    }

    async emitEvent(pattern: string, data: any): Promise<void> {
        console.log(`Emitting event to pattern: ${pattern}`, data);
        try {
            await firstValueFrom(
                this.client.emit(pattern, data).pipe(
                    retry({ count: 3, delay: 1000 }) // Thử lại 3 lần, mỗi lần cách nhau 1 giây
                )
            );
        } catch (error) {
            console.error(`Error emitting event to ${pattern}:`, error);
            throw error;
        }
    }

    async close() {
        await this.client.close();
    }
}