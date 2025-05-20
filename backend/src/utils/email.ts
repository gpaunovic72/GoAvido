import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Verify your email for your account GoAvido",
      text: `Please verify your email by clicking on the link below: ${process.env.FRONTEND_URL}/verify/${token}`,
      html: `<h1>Hello ${name}</h1>
      <p>Please verify your email by clicking on the link below:</p>
      <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify your email</a> <br>
      <p>Thank you for signing up for GoAvido.</p>
      <p>Best regards, <br>
      The GoAvido team</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
