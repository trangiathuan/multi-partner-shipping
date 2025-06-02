// my.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendEmailUpdateStatus(email: string, status: string, order_code: string) {
        let htmlContent = '';
        console.log(`Sending email to ${email} with status ${status} for order ${order_code}`);

        switch (status) {
            case 'created':
                htmlContent = `
        <h2 style="color: #333;">Đơn hàng của bạn đã được tạo!</h2>
        <p>Chúng tôi đã nhận được yêu cầu giao hàng từ bạn.</p>
        <p>Mẫ đơn hàng: ${order_code}</p>
        <p>Hệ thống đang xử lý và sẽ sớm cập nhật trạng thái tiếp theo.</p>
      `;
                break;
            case 'accepted':
                htmlContent = `
        <h2 style="color: #333;">Đơn hàng ${order_code} của bạn đã được xác nhận</h2>
        <p>Đơn vị vận chuyển sẽ sớm đến lấy hàng</p>
        <p>Vui lòng giữ điện thoại để liên hệ khi cần thiết.</p>
      `;
                break;
            case 'shipping':
                htmlContent = `
        <h2 style="color: #333;">Đơn hàng ${order_code} của bạn đang được giao</h2>
        <p>Shipper của chúng tôi đang trên đường đến địa chỉ của bạn.</p>
        <p>Vui lòng giữ điện thoại để liên hệ khi cần thiết.</p>
      `;
                break;

            case 'delivered':
                htmlContent = `
        <h2 style="color: #333;">Đơn hàng ${order_code} đã giao thành công</h2>
        <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.</p>
        <p>Hẹn gặp lại bạn vào lần sau!</p>
      `;
                break;

            case 'failed':
                htmlContent = `
        <h2 style="color: #333;">Đơn hàng ${order_code} đã bị huỷ</h2>
        <p>Rất tiếc, đơn hàng của bạn đã bị huỷ theo yêu cầu hoặc do lỗi xử lý.</p>
        <p>Nếu bạn có thắc mắc, vui lòng liên hệ bộ phận hỗ trợ.</p>
      `;
                break;

            default:
                htmlContent = `
        <h2 style="color: #333;">Cập nhật đơn hàng</h2>
        <p>Trạng thái đơn hàng của bạn: <strong>${status}</strong></p>
      `;
                break;
        }

        await this.mailerService.sendMail({
            to: email,
            subject: '[TPOST] - Cập nhật đơn hàng',
            html: htmlContent,
        });
    }

}
