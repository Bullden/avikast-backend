import INotificationService from './INotificationService';
import {Injectable} from '@nestjs/common';
import {IEmailSenderService} from 'services/emailSender/IEmailSenderService';
import IUserStore from 'database/stores/user/IUserStore';
import ISessionStore from 'database/stores/session/ISessionStore';
import {
  createNewPasswordMessage,
  createSuccessRegistrationMessage,
} from 'services/notifications/messages/EmailMessages';

@Injectable()
export default class NotificationService extends INotificationService {
  constructor(
    private readonly userStore: IUserStore,
    private readonly sessionStore: ISessionStore,
    private readonly mailerService: IEmailSenderService,
  ) {
    super();
  }

  async sendRegistrationMessage(userName: string, email: string) {
    const message = createSuccessRegistrationMessage(userName);
    await this.mailerService.sendMessage(email, message);
  }

  async sendNewPassword(userId: string, password: string) {
    const user = await this.userStore.getUser(userId);
    if (!user) throw new Error('Email sender no user');
    const message = createNewPasswordMessage(password);
    await this.mailerService.sendMessage(user.email, message);
  }
}
