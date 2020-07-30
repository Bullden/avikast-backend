import EmailMessage from 'services/emailSender/EmailMessage';

type Context = {
  text?: string;
  userName?: string;
  newPassword?: string;
};

export default interface NewPasswordMessage extends EmailMessage<Context> {}

export interface SuccessRegistrationMessage extends EmailMessage<Context> {}

export function createNewPasswordMessage(newPassword: string): NewPasswordMessage {
  return {
    template: 'NewPassword',
    subject: 'Avikast - New Password',
    context: {
      newPassword,
    },
  };
}

export function createSuccessRegistrationMessage(
  userName: string,
): SuccessRegistrationMessage {
  return {
    template: 'NewUser',
    subject: `Avikast - Welcome in our service`,
    context: {
      userName,
    },
  };
}
