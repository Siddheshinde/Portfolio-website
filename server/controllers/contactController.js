import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

/** Simple RFC-5322-inspired email format check */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Sends an email notification to the portfolio owner.
 * This is intentionally non-blocking — a failed send must NOT reject the request.
 */
const sendEmailNotification = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: 'siddhesh.shinde23@spit.ac.in',
    subject: `Portfolio Contact: ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #111; border-bottom: 2px solid #ddd; padding-bottom: 12px;">New Portfolio Contact</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #111;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0070f3;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; color: #111; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          Sent via your portfolio contact form · ${new Date().toUTCString()}
        </p>
      </div>
    `,
  });
};

/**
 * POST /api/contact
 * Validates input, persists the contact document, and (optionally) fires an email notification.
 */
export const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // --- Validation ---
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Name must be a non-empty string.' });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message must be a non-empty string.' });
    }

    // --- Persist ---
    await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    // --- Email notification (non-blocking) ---
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      sendEmailNotification({ name: name.trim(), email: email.trim(), message: message.trim() }).catch(
        (emailErr) => {
          console.error('[Email] Notification failed (non-fatal):', emailErr.message);
        }
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
    });
  } catch (err) {
    next(err);
  }
};
