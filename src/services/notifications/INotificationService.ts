export default abstract class INotificationService {
  abstract sendRegistrationMessage(userName: string, email: string): Promise<void>;

  abstract sendNewPassword(userId: string, password: string): Promise<void>;
}
