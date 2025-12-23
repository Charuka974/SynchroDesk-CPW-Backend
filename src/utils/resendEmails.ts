import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

const resend = new Resend(RESEND_API_KEY);

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailArgs) => {
  if (!html && !text) {
    throw new Error("Either html or text must be provided");
  }

  return resend.emails.send({
    from: "Synchro Desk <onboarding@resend.dev>",
    to,
    subject,
    ...(html ? { html } : { text: text! }),
  });
};
