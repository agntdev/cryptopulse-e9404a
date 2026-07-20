# CryptoPulse Telegram Bot — Bot specification

**Archetype:** custom

**Voice:** professional and concise — write every user-facing message, button label, error, and empty state in this voice.

A private Telegram bot for tracking cryptocurrency prices with customizable price-threshold and percentage-change alerts. Users manage personal watchlists, receive optional morning summaries, and set quiet hours. The bot owner receives aggregated admin metrics about usage and alert patterns.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- Individual Telegram users interested in crypto price tracking
- Bot owner for administrative metrics

## Success criteria

- Users receive accurate price alerts without spam
- Admin metrics dashboard shows active users and alert patterns
- All user data remains private and persistent across sessions

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open main menu with watchlist management and settings
- **Add to Watchlist** (button, actor: user, callback: watchlist:add) — Begin adding a new coin to watchlist
  - inputs: ticker symbol, alert preferences
  - outputs: updated watchlist entry
- **View Watchlist** (button, actor: user, callback: watchlist:view) — Display current watchlist items with quick actions
  - inputs: none
  - outputs: formatted watchlist with inline buttons
- **/price** (command, actor: user, command: /price) — Check current prices for watchlist or specific ticker
  - inputs: optional ticker symbol
  - outputs: price data with alert status

## Flows

### Onboarding
_Trigger:_ /start

1. Display welcome message
2. Request timezone selection
3. Set default quiet hours (23:00-07:00)

_Data touched:_ user profile

### Alert Management
_Trigger:_ watchlist:add

1. Show popular coin buttons + 'Other...' option
2. Validate ticker input
3. Configure alert rules
4. Set initial cooldown state

_Data touched:_ watchlist entry

### Morning Summary
_Trigger:_ scheduled daily

1. Check user's summary preference
2. Compile current prices and recent alerts
3. Send formatted summary if not in quiet hours

_Data touched:_ alert events, user profile

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **User Profile** _(retention: persistent)_ — User account and preference data
  - fields: telegram user id, display name, timezone, quiet hours, summary time, alert cooldown duration, language
- **Watchlist Entry** _(retention: persistent)_ — Monitored cryptocurrency with alert rules
  - fields: user id, ticker symbol, friendly name, enabled alert types, threshold rules, percent-change rules, last-notified timestamp, last-notified price, enabled flag
- **Alert Event** _(retention: persistent)_ — Record of triggered alerts
  - fields: user id, ticker, alert type, trigger value, old price, new price, percent change, timestamp
- **Admin Metrics** _(retention: persistent)_ — Aggregated usage statistics
  - fields: total active users, alert counts per ticker, alert type distribution

## Integrations

- **Telegram** (required) — Bot API messaging
- **Crypto Price API** (required) — Price data source
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- View total active users
- View top 20 most-triggered alerts by ticker
- Access daily alert statistics

## Notifications

- Direct user alerts with price changes
- Daily admin metrics summary
- Error notifications for price-source failures

## Permissions & privacy

- All user data is private and not shared
- No wallet or trade execution access
- Admin metrics show aggregated statistics only

## Edge cases

- Unknown/misspelled ticker handling
- Price-source API failures with retry logic
- Alert suppression during quiet hours
- Cooldown period management for repeated triggers

## Required tests

- Verify alert cooldown prevents spam
- Test quiet hours alert suppression
- Validate price-source failure handling
- Confirm admin metrics accuracy

## Assumptions

- Default quiet hours set to 23:00-07:00
- Percent-change default window is 1 hour
- Alert cooldown defaults to 6 hours
- Morning summary is optional by default
