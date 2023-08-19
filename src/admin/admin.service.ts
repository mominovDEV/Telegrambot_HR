import { AppService } from './../app.service';
import { keyboard } from './../enums/keyboard.enums';
import { Injectable } from '@nestjs/common';
import { Context, Markup, session } from 'telegraf';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
@Injectable()
export class AdminService {
  constructor(
    @Inject(forwardRef(() => AppService))
    private appservice: AppService,
  ) {}
  start(ctx: any) {
    ctx.reply('Assalomu aleykum Admin, xush kelibsiz');
    ctx.reply('Send user id  👇');
  }

  message_to_user(ctx: any) {
    const input = ctx.update.message.text;
    let message = '';
    try {
      if (Number(input)) {
        const userId = input;
        ctx.session.userId = userId; // Save user's ID in session
      } else {
        message = input;
      }
      if (message.length) {
        const userId = ctx.session.userId; // Retrieve user's ID from session
        ctx.telegram.sendMessage(userId, message);
        ctx.reply('Message sent successfully ✅');
      }
    } catch (err) {
      ctx.reply('User not found!');
    }
  }
}

// async checkAndSendMessagesToAdmin() {
// const userMessages = this.appService.getUserMessages();

// if (userMessages.length > 0) {
//   // Process and send user messages to the admin
//   for (const message of userMessages) {
//     await this.sendUserMessageToAdmin(message);
//   }
//   // Clear processed messages
//   this.appService.clearUserMessages();
// }
