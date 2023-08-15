import { Action, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, session } from 'telegraf';
import {
  keyboard,
  keyboards,
  vacboard,
  activity,
} from './enums/keyboard.enums';
import { UserService } from './user/user.service';
import { isAdmin } from './utils/is_admin';
import { AdminService } from './admin/admin.service';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class AppService {
  constructor(
    private userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  @Start()
  start(@Ctx() ctx: Context) {
    const id = ctx.from.id;
    if (isAdmin(id)) {
      return this.adminService.start(ctx);
    }
    const keyboar = Markup.keyboard([
      [keyboard.AboutUs, keyboard.Vacancies],
      [keyboard.ContactUs, keyboard.Comment],
    ]).resize();
    ctx.reply(
      `Welcome to Mate Group HR bot!

I will introduce our company and help you to apply for an available vacancy`,
      keyboar,
    );
  }

  @Hears(keyboard.AboutUs)
  about_us(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([
      [keyboards.Back, keyboards.Home],
    ]).resize();
    ctx.reply(
      `Mate Group is a leading provider of logistics service, Mate Group offers a dynamic and rewarding work environment where your skills and passion can thrive. If you are looking for a challenging and rewarding career in an American company. Mate Group is the place for you.

Take the next step in your career journey and apply today to become a valued member of Mate Group without previous experience.`,
      keyboard,
    );
  }

  @Hears(keyboard.Vacancies)
  vacancy(@Ctx() ctx: Context) {
    const vacboards = Markup.keyboard([[vacboard.vac1]])
      .resize()
      .oneTime();
    ctx.reply(`Let\`s start filling your resume`);

    ctx.reply(`Choose one of the vacancies`, vacboards);

    // ctx.reply(keyboardss);
  }

  @Hears(vacboard.vac1)
  vac1(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([
      [keyboards.Back, keyboards.Home],
    ]).resize();
    ctx.reply(
      `❗️Mate Group announces a vacancy for Auto Transport Broker position.❗️ 

⚠️Requirements 

🔥Fluent English level - speaking with American customers 
🔥Basic computer skill - using CRM on browser 
🔥Problem-solving skill - understanding a problem and giving a right solution 
🔥Communication skill - understanding a customer and to be understood effectively 

🖥Working condition 

📌Working hours between 6pm and 4am UZST 6/1 
📌Supportive and friendly young team 
📌Convenient office in city center 
📌Opportunity to control own earning 
📌Payment every 2 weeks + bonuses💸`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: 'Apply', callback_data: '4' }]],
        },
      },
    );
  }

  @Action(/4/)
  async name(@Ctx() ctx: any) {
    // const name_id = ctx.from.id;
    // console.log(ctx.message.message_id);

    ctx.session.menu = vacboard.vac1;
    // ctx.session.menu = this.name;

    ctx.reply(`https://forms.gle/bbBwdbkGXpFHwfgf9`);
  }

  @On('text')
  async text(ctx: any) {
    console.log(ctx.session.menu);

    console.log(ctx.message);
    ctx.reply(ctx.session.user_id);
  }

  message(ctx: any) {
    console.log('105');

    const message = ctx.message.text;

    switch (ctx.session.menu) {
      case vacboard.vac1: {
        ctx.session.date = {
          name: message,
        };
        ctx.reply('Date of birth (ex. 12.31.1999)');
        return 0;
      }
    }
  }

  @Hears(keyboard.Comment)
  comment(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([
      [keyboards.Back, keyboards.Home],
    ]).resize();
    ctx.reply(`Leave us a message here, we will answer it`, keyboard);
  }

  @Hears(keyboard.ContactUs)
  contact_us(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([keyboards.Back, keyboards.Home]).resize();
    ctx.reply(
      `Contact information: 
Phone: 94 413 7300 
Telegram: @ali_briann 
Location: Tashkent, Osiyo street 40 
Google maps: bit.ly/47vq90v 
Yandex maps: bit.ly/3DRrdhG`,
      keyboard,
    );
  }

  // @Hears(keyboards.Back)
  // back(@Ctx() ctx: Context) {
  //   const keyboar = Markup.keyboard([
  //     keyboard.AboutUs,
  //     keyboard.Vacancies,
  //     keyboard.ContactUs,
  //     keyboard.Comment,
  //   ]).resize();
  // }

  @Hears(keyboards.Home)
  home(@Ctx() ctx: Context) {
    const keyboar = Markup.keyboard([
      keyboard.AboutUs,
      keyboard.Vacancies,
      keyboard.ContactUs,
      keyboard.Comment,
    ]).resize();
    ctx.reply(
      `Welcome to Mate Group HR bot!

I will introduce our company and help you to apply for an available vacancy`,
      keyboar,
    );
  }

  // @SceneEnter(keyboard.Vacancies)
  // async enter(@Ctx() context: SceneContext) {
  //   context.reply('2+2 = ?', {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [{ text: 'Может быть 4?', callback_data: '4' }],
  //         [{ text: 'Точно пять!', callback_data: '5' }],
  //       ],
  //     },
  //   });
  // }

  // @Action(/4|5/)
  // async onAnswer(
  //   @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
  // ) {
  //   const cbQuery = context.update.callback_query;
  //   const userAnswer = 'data' in cbQuery ? cbQuery.data : null;

  //   if (userAnswer === '4') {
  //     context.reply('верно!');
  //     context.scene.enter('nextSceneId');
  //   } else {
  //     context.reply('подумай еще');
  //   }
  // }

  // @Command('')
  // async InlineButton(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [[{ text: 'Button 1', callback_data: 'button1' }]];
  //   ctx.reply('Choose a inline button:', {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // case "offer_start": {
  //   return await bot.sendMessage(chatId, messageOffer.offer_start, {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [{ text: "Резюме", callback_data: "cv_public" }],
  //         [{ text: '"Холодные" письма', callback_data: "cold_letter" }],
  //         [{ text: "⬅️ Oldingi qadam", callback_data: "start" }],
  //       ],
  //     },
  //   });
  // }

  // @On('channel_post')
  // async onChanelPost(@Ctx() ctx: Context) {
  //   if ('channel_post' in ctx.message) {
  //     await ctx.reply(String(ctx.message.channel_post));
  //   }
  // }
}
