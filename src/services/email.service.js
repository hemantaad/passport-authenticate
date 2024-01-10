const config = require("config");
const nodemailer = require("nodemailer");
const pug = require("pug");

const webURL = config.get("webURL");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("smptUsername"),
    pass: config.get("smptPassword"),
  },
});

class Email {
  constructor(email) {
    this.to = email;
  }

  async send(options) {
    await transporter.sendMail(options);
  }

  async prepareSend(template, subject, content = {}, attachments = []) {
    const html = pug.renderFile(`${__dirname}/../emails/${template}.pug`, {
      webURL,
      ...content,
    });
    const mailOptions = {
      from: config.get("smptUsername"),
      to: this.to,
      subject,
      html,
      attachments: attachments,
    };

    await this.send(mailOptions);
  }

  async sendVerificationEmail() {
    const content = {
      link: `${webURL}/verify-email?email=${this.to}`,
      linkText: `${webURL}/verify-email?email=${this.to}`,
      buttonText: "Verify email",
    };
    console.log(webURL, "webURL");
    console.log(`${config.get("webURL")}/verify-email?email=${this.to}`);
    await this.prepareSend("verification-email", "Email verification", content);
  }
}

module.exports = { Email };
