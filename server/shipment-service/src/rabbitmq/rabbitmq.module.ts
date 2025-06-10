import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
                    queue: 'main_queue',
                    queueOptions: {
                        durable: true,
                    },
                    maxConnectionAttempts: 5,
                    socketOptions: {
                        connectionTimeout: 5000, // Timeout 5 giây
                    },
                },
            },
        ]),
    ],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }