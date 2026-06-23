import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const role = formData.get('role');
    const portfolio = formData.get('portfolio');
    const coverLetter = formData.get('coverLetter');
    const resumeFile = formData.get('resume');

    if (!fullName || !email || !role || !coverLetter) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the email transport using SMTP credentials
    const isGmail = (process.env.SMTP_HOST || '').includes('gmail.com') || !process.env.SMTP_HOST;
    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            service: 'gmail',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          }
        : {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          }
    );

    const mailOptions = {
      from: process.env.SMTP_USER || '"The Strive Ads Careers" <noreply@thestriveads.com>',
      to: 'info@thestriveads.com', // Destination email
      replyTo: email,
      subject: `New Job Application: ${fullName} for ${role}`,
      text: `
        You have received a new job application.

        Name: ${fullName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Role/Position: ${role}
        Portfolio: ${portfolio || 'Not provided'}

        Cover Letter:
        ${coverLetter}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6B10C9; margin-top: 0;">New Job Application</h2>
          <p>You have received a new job application.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Role/Position:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Portfolio:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : 'Not provided'}</td>
            </tr>
          </table>
          <h3 style="margin-top: 20px;">Cover Letter:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${coverLetter}</div>
        </div>
      `,
      attachments: []
    };

    // Attach the resume if it exists
    if (resumeFile && resumeFile instanceof File) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      mailOptions.attachments.push({
        filename: resumeFile.name,
        content: buffer,
        contentType: resumeFile.type
      });
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Application sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending application email:', error);
    return NextResponse.json(
      { message: 'Failed to send application. Please try again later.' },
      { status: 500 }
    );
  }
}
