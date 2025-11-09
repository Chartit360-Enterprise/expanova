# Contact Form Setup Guide

This project uses **Resend** for handling contact form submissions. Resend is a modern email API service that's perfect for Next.js applications.

## Why Resend?

- ✅ **Free tier**: 3,000 emails/month
- ✅ **Easy setup**: Simple API, great developer experience
- ✅ **Built for Next.js**: Works seamlessly with Server Actions
- ✅ **Great deliverability**: Emails reach inboxes reliably
- ✅ **No SMTP configuration needed**: Just an API key

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log into your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Expanova Contact Form")
5. Copy the API key (you'll only see it once!)

### 3. Add Domain (Optional but Recommended)

For production, you should add your domain:

1. Go to **Domains** in the Resend dashboard
2. Click **Add Domain**
3. Follow the DNS setup instructions
4. Once verified, you can use emails like `noreply@yourdomain.com`

**Note**: For development/testing, you can use Resend's default domain (`onboarding@resend.dev`), but emails will be limited.

### 4. Configure Environment Variables

Add these to your `.env.local` file (or your deployment platform's environment variables):

```env
# Required: Your Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Required: Email address where contact form submissions should be sent
CONTACT_EMAIL=your-email@example.com

# Required: The "from" email address (must be verified in Resend)
# For production, use your verified domain: noreply@yourdomain.com
# For development, you can use: onboarding@resend.dev
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 5. Usage

The contact form component is ready to use! Import it in any page:

```tsx
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  )
}
```

## File Structure

- `app/actions/contact.ts` - Server Action that handles email sending
- `components/contact-form.tsx` - React form component
- `components/ui/input.tsx` - Input component (matches your design system)
- `components/ui/label.tsx` - Label component
- `components/ui/textarea.tsx` - Textarea component

## Customization

### Change Email Template

Edit the HTML template in `app/actions/contact.ts` (around line 50) to match your brand.

### Add More Fields

1. Update the `ContactFormData` interface in `app/actions/contact.ts`
2. Add the field to the form in `components/contact-form.tsx`
3. Update the email template to include the new field

### Change Styling

The form components use your existing design system colors (`expanova-*`). You can customize them in:
- `components/ui/input.tsx`
- `components/ui/textarea.tsx`
- `components/ui/label.tsx`

## Testing

1. Make sure your environment variables are set
2. Fill out the form on your contact page
3. Check your email inbox (and spam folder)
4. The reply-to will be set to the sender's email, so you can reply directly

## Troubleshooting

### Emails not sending?

1. **Check environment variables**: Make sure `RESEND_API_KEY` and `CONTACT_EMAIL` are set
2. **Check Resend dashboard**: Look for error logs in the Resend dashboard
3. **Check console**: Server-side errors will appear in your Next.js logs
4. **Domain verification**: If using a custom domain, ensure it's verified

### Rate Limits

Resend's free tier allows 3,000 emails/month. If you exceed this, you'll need to upgrade or wait until the next month.

## Alternative Options

If you prefer a different solution:

1. **Server Actions + Nodemailer**: More control, but requires SMTP setup
2. **SendGrid**: Enterprise-grade, similar to Resend
3. **Formspree**: No backend needed, but less control
4. **EmailJS**: Client-side only, but limited functionality

## Security Notes

- ✅ Server Actions run on the server (API key is never exposed)
- ✅ Form validation happens server-side
- ✅ Email format is validated
- ✅ Rate limiting can be added if needed (consider using a library like `@upstash/ratelimit`)

## Next Steps

1. Set up your Resend account
2. Add environment variables
3. Test the form
4. Customize the email template to match your brand
5. Deploy and enjoy! 🎉

