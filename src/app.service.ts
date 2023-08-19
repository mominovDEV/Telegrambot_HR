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
    const keyboar = Markup.keyboard([
      [keyboard.AboutUs, keyboard.Vacancies],
      [keyboard.ContactUs, keyboard.Comment],
    ]).resize();
    ctx.reply(
      `Mate Group is a leading provider of logistics service, Mate Group offers a dynamic and rewarding work environment where your skills and passion can thrive. If you are looking for a challenging and rewarding career in an American company. Mate Group is the place for you.

Take the next step in your career journey and apply today to become a valued member of Mate Group without previous experience.`,
      keyboar,
    );
  }

  @Hears(keyboard.ContactUs)
  contact_us(@Ctx() ctx: any) {
    const keyboar = Markup.keyboard([
      [keyboard.AboutUs, keyboard.Vacancies],
      [keyboard.ContactUs, keyboard.Comment],
    ]).resize();
    ctx.reply(
      `Contact information:
Telegram: @ali_briann
Location: Tashkent, Osiyo street 40

`,
    );
    ctx.replyWithLocation(41.327753, 69.285488, {
      // Example latitude and longitude
      title: 'Our Location',
      address: 'Tashkent, Osiyo street 40',
    });
  }

  @Hears(keyboard.Vacancies)
  vacancy(@Ctx() ctx: Context) {
    const vacboards = Markup.keyboard([[vacboard.vac1], [keyboards.Home]])
      .resize()
      .oneTime();
    ctx.reply(`Let\`s start filling your resume`);

    ctx.reply(`Choose one of the vacancies`, vacboards);

    // ctx.reply(keyboardss);
  }

  @Hears(vacboard.vac1)
  vac1(@Ctx() ctx: Context) {
    // const keyboard = Markup.keyboard([
    //   [keyboards.Back, keyboards.Home],
    // ]).resize();
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
    ctx.session.menu = vacboard.vac1;

    const message = `
      Click [here](http://bit.ly/3ElVcih) to visit our website.

    `;

    ctx.replyWithMarkdownV2(message);
  }

  @Hears(keyboards.Home)
  home(@Ctx() ctx: any) {
    console.log('keyboards.Home');

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

  @Hears(keyboard.Comment)
  comment(@Ctx() ctx: any) {
    console.log(ctx.message);

    const keyb = Markup.keyboard([[keyboards.Home]]).resize();
    ctx.session.commenting = true;

    ctx.reply(`Leave us a message here, we will answer it`, keyb);
  }

  @On('text')
  async onTextMessage(@Ctx() ctx: any) {
    if (ctx.session.commenting) {
      // const vacboards = Markup.keyboard([keyboards.Home]).resize();

      ctx.reply(
        `We have received your message, will get back to you shortly.`,
        // vacboards,
      );

      // Clear the commenting state
      ctx.session.commenting = false;
    }
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
}
