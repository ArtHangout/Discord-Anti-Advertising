# Discord-Anti-Advertising

Check if string has a discord invite, with optional guild whitelist

## Usage

Below is a sample session with discord anti advertising with this package. It should answer most questions.

```node
var AntiAdvertising = require('discord-anti-advertising');

var ad = new AntiAdvertising();
ad.guild_ids -> Set
ad.guild_ids.add('12345678910) ->
ad.check('https://discord.gg/AsdDfGs'); -> true; (not in whitelist)
ad.check('https://discord.gg/ASdAgAa'); -> false; (in whitelist)
ad.check('I like pasta discord.gg/AsdDfGs') -> true;
ad.check('I like pasta') -> false;
```

## Functions

- `check()` -> `Promise`
  - Resolves if string given is a discord invite, and if it is not one of the guilds allowed.
- `guild_ids` -> `Set`
  - Returns the allowed guild ids.
