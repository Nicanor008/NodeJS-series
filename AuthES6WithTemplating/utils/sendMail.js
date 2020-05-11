import { createTransport } from "nodemailer";

const from = "\"ShopMerc\" <shopmerc.com>";

function setup() {
  return createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: 'shomancodes@gmail.com',
      pass: 'ShomanCodes@2020',
    },
  });
}

export function sendConfirmEmail(data) {
  const transport = setup();
  const userEmail = data.email;
  const generateConfirmationUrl = `http://localhost:4001/v1/auth/verify/${userEmail}`;

  const msg = {
    from,
    to: userEmail,
    subject: "Activate your account",
    text: `
    Welcome to ShopMerc. We are very happy to have you here. Activate your account.
    `,
    html: `
      <h2 style="display: flex; align-items: center;">Welcome to ShopMerc</h2>
        <p>Please activate your account using <a href=${generateConfirmationUrl}>this link</a>
         🎊 🎉 🚀</p>
    `,
  };
  transport.sendMail(msg);
}
