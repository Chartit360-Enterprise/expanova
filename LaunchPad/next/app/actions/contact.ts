'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ContactFormResponse {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: 'Name, email, and message are required fields.',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Please provide a valid email address.',
      }
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL
    
    if (!recipientEmail) {
      console.error('CONTACT_EMAIL or RESEND_FROM_EMAIL environment variable is not set')
      return {
        success: false,
        error: 'Email service is not configured. Please contact the administrator.',
      }
    }

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: recipientEmail,
      replyTo: data.email,
      subject: data.subject || `Contact Form: ${data.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0D0D0F; color: #FAFAFA;">
          <h2 style="color: #14B8A6; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #14B8A6;">Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong style="color: #14B8A6;">Email:</strong> <a href="mailto:${data.email}" style="color: #2DD4BF;">${data.email}</a></p>
            ${data.subject ? `<p style="margin: 10px 0;"><strong style="color: #14B8A6;">Subject:</strong> ${data.subject}</p>` : ''}
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08);">
            <h3 style="color: #14B8A6; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          
          <p style="margin-top: 20px; color: rgba(250, 250, 250, 0.6); font-size: 12px;">
            This email was sent from the contact form on your website.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}` : ''}

Message:
${data.message}
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    }
  }
}

