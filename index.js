const fetch = require('node-fetch');
const inviteRegex = /(discord\.(gg|io|me|li)|discord(app)?\.com\/invite)(\/.+)/gi;

module.exports = class AntiAdvertising {
  /**
   *
   * @param {(String|Array<String>|Set<String>)} guild_ids
   */
  constructor(guild_ids) {
    this.guild_ids = new Set();
    if (guild_ids instanceof Set) {
      for (var i of Array.from(guild_ids.keys())) this.guild_ids.add(i);
      return;
    }
    if (!guild_ids) return;
    if (Array.isArray(guild_ids)) for (var i of guild_ids) this.guild_ids.add(i);
    else this.guild_ids.add(guild_ids);
  }

  check(string) {
    return new Promise((res, rej) => {
      if (!inviteRegex.test(string)) return res(false);
      var inv = 'https://' + string.match(inviteRegex)[0];
      fetch(inv)
        .then((s) => s.text())
        .then((s) => {
          s = s.replace(/(?:\r\n|\r|\n)/g, '');
          const search = RegExp(
            '((?<=(meta property="og:image" content="https:\\/\\/cdn.discordapp\\.com\\/icons\\/))[0-9].+?(?=(\\/)))',
            'gm'
          );
          var guild_id = search.exec(s);
          if (this.guild_ids.has(guild_id)) return res(false);
          res(true);
        })
        .catch((err) => rej(err));
    });
  }
};
