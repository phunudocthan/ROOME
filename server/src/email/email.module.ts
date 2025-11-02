import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // Import ConfigModule to use ConfigService
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: config.get<number>('EMAIL_PORT'),
          secure: config.get<boolean>('EMAIL_SECURE'), // true for 465, false for other ports
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
        },
        defaults: {
          from: config.get<string>('EMAIL_FROM'),
        },
        template: {
          // Tell the mailer where to find your templates
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      // Inject ConfigService
      inject: [ConfigService],
    }),
  ],
  // Provide and export EmailService so other modules can use it
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
