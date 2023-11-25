import { Injectable , HttpException ,HttpStatus} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExampleService {
  constructor(private readonly mailerService: MailerService) {}

  async example(email: string) {
try {
    await this.mailerService
    .sendMail({
      to: email, // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
} catch (error) {
    throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'This is a custom message Internal Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
}

 
  }

  async example2() {
   try {
   await this.mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: './confirmation', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
    return 
   } catch (error) {
    throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'This is a custom message Internal Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
   } 
       
  }
}