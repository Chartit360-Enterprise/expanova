# Resend Quick Setup Guide

## Step-by-Step Setup (5 minutes)

### 1. Create Resend Account
1. Go to **[resend.com](https://resend.com)** and click "Sign Up"
2. Sign up with email or GitHub
3. Verify your email address

### 2. Get Your API Key
1. Once logged in, go to **API Keys** in the sidebar
2. Click **"Create API Key"** button
3. Name it: `Expanova Contact Form`
4. **Copy the key** (it starts with `re_` - you'll only see it once!)
5. Click "Add API Key"

### 3. Set Up Environment Variables

Create a `.env.local` file in the `LaunchPad/next/` directory:

```bash
cd LaunchPad/next
touch .env.local
```

Add these variables (replace with your actual values):

```env
# Your Resend API Key (from step 2)
RESEND_API_KEY=re_your_actual_api_key_here

# Your email address (where you want to receive contact form messages)
CONTACT_EMAIL=your-email@example.com

# For development: use Resend's default domain
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important:** 
- Replace `re_your_actual_api_key_here` with your actual API key from Resend
- Replace `your-email@example.com` with your actual email address
- For now, keep `RESEND_FROM_EMAIL=onboarding@resend.dev` (this works for testing)

### 4. Test It Out!

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/en/contact` (or your locale)

3. Fill out the form and submit

4. Check your email inbox! 🎉

### 5. (Optional) Add Your Domain for Production

For production, you'll want to use your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `expanova.io`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually 5-10 minutes)
6. Once verified, update `.env.local`:
   ```env
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

## Troubleshooting

### Emails not sending?
- ✅ Check that `.env.local` exists in `LaunchPad/next/` directory
- ✅ Make sure `RESEND_API_KEY` starts with `re_`
- ✅ Verify `CONTACT_EMAIL` is a valid email address
- ✅ Check the browser console and terminal for errors
- ✅ Check Resend dashboard → Logs for error messages

### "Email service is not configured" error?
- Make sure all three environment variables are set
- Restart your dev server after adding `.env.local`

### Testing with `onboarding@resend.dev`?
- This works for development but has limitations
- For production, add and verify your domain

## Next Steps

Once it's working:
1. ✅ Test the form locally
2. ✅ Add your domain to Resend (for production)
3. ✅ Update environment variables in Vercel (when deploying)
4. ✅ Deploy and test on production!

## Need Help?

- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/emails
- Check `CONTACT_FORM_SETUP.md` for detailed documentation

