import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Add to Watchlist: wire the main menu button so the /start handler renders it.
// This handler does NOT wire the button; registerMainMenuItem does (called at
// module load before buildBot loads it). This makes concurrent feature PRs never
// conflict — each feature lives in its own file.
registerMainMenuItem({ label: "📅 Watchlist", data: "watchlist:add", order: 20 });

const WELCOME_ADD = "📅 Add to Watchlist: enter a ticker symbol (e.g. BTC, ETH) to monitor its price.";
const BACK_TO_MENU = inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]);

const composer = new Composer<Ctx>();

composer.callbackQuery("watchlist:add", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(WELCOME_ADD, { reply_markup: BACK_TO_MENU });
});

export default composer;
