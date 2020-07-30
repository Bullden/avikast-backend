import {Module} from '@nestjs/common/decorators';
import {IEmailSenderService} from 'services/emailSender/IEmailSenderService';
import {EmailSenderService} from 'services/emailSender/EmailSenderService';
import {HandlebarsAdapter, MailerModule} from '@nest-modules/mailer';
import * as fs from 'fs';
import {getProjectRoot} from 'utils/FileSystemUtils';
import {createConfigService, getConfigEnv} from '@spryrocks/config-node';

const configService = createConfigService(getConfigEnv(), undefined);

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const templates = configService.get('EMAIL_TEMPLATES');
        const username = configService.get('EMAIL_SENDER_USERNAME');
        const password = configService.get('EMAIL_SENDER_PASSWORD');
        const host = configService.get('EMAIL_SMTP_HOST');
        const from = configService.get('EMAIL_FROM');
        const templatesDir = `${getProjectRoot()}/${templates}`;
        if (!fs.existsSync(templatesDir))
          throw new Error(`templatesDir not exists at '${templatesDir}'`);
        return {
          transport: `smtp://${username}:${password}@${host}`,
          defaults: {
            from,
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: IEmailSenderService,
      useClass: EmailSenderService,
    },
  ],
  exports: [
    //
    IEmailSenderService,
  ],
})
export class EmailSenderModule {}
