import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// /price: check current prices for the watchlist or a specific ticker symbol.
const WELCOME_PRICE = "📊 Current price check: /price (shows watchlist summary) or /price <ticker> (e.g. /price BTC) for a specific coin.\n\n" + inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]);

const composer = new Composer<Ctx>();

composer.command("price", async (ctx) => {
  await ctx.reply(WELCOME_PRICE);
});

export default composer;
