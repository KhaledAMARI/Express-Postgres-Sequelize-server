const fs = require('fs');

const htmlTemplate = (token, delay = 1) => {
  let res;
  if (token) {
    res = fs.readFileSync(__dirname + '/bearer_token_mail_template_en.html', 'utf8');
    res = res.replace('@token@', token);
    res = res.replace('@delay@', delay);
  } else {
    res = fs.readFileSync(__dirname + '/validation_mail_template_en.html', 'utf8');
  };
  return res;
};

module.exports = {
  name: "mail_plugin",
  template: htmlTemplate
};