function userinfo(msg) {
  return `Hello
      \nID:${msg.message_id}
      \nLanguage: ${msg.from.language_code}
      \nFirst name: ${msg.from.first_name}
      \nLast name: ${msg.from.last_name}
      \nUser name: ${msg.from.username}
      \nDate: ${msg.date}
      `
}

module.exports.userinfo = userinfo;