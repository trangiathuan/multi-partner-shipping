import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                auth: {
                    user: 'trangiathuan8223@gmail.com',
                    pass: 'spyh ugmo nvch dhtb', // App password Gmail
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
