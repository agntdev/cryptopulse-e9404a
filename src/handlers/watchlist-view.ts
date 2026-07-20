import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// View Watchlist: wire the main menu button.
registerMainMenuItem({ label: "📋 Watchlist", data: "watchlist:view", order: 20 });

const WELCOME_VIEW = "📋 Your watchlist shows prices for coins you track:\n\n"; // TODO: display actual watchlist
const BACK_TO_MENU = inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]);

const composer = new Composer<Ctx>();

composer.callbackQuery("watchlist:view", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(WELCOME_VIEW, { reply_markup: BACK_TO_MENU });
});

export default composer;
