# 🚀 Portfolio Contact Form - Complete Setup Guide

Your backend is **already fully configured** with Nodemailer! This guide will help you set it up in **under 5 minutes**.

---

## ✅ What's Already Done

Your backend (`server-email.js`) is production-ready with:

- ✅ Nodemailer properly configured
- ✅ Gmail SMTP integration
- ✅ Connection pooling and retry logic
- ✅ Beautiful HTML email templates
- ✅ Health check endpoint
- ✅ CORS setup for frontend
- ✅ Error handling and timeouts

**All you need to do**: Add your Gmail credentials!

---

## 📋 Setup Steps

### 1️⃣ Install Dependencies (1 minute)

```bash
cd backend
npm install
```

This installs:

- `nodemailer` - Email sending
- `express` - Web server
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

---

### 2️⃣ Get Gmail App Password (2 minutes)

#### Why App Password?

Gmail requires an "App Password" for third-party apps (not your regular password).

#### How to Get It:

**Step 1**: Enable 2-Step Verification

- Go to: https://myaccount.google.com/security
- Click "2-Step Verification" → Follow the setup

**Step 2**: Create App Password

- Go to: https://myaccount.google.com/apppasswords
- Select:
  - **App**: Mail
  - **Device**: Other (Custom name) → "Portfolio Backend"
- Click **Generate**
- You'll get a 16-character password like: `abcd efgh ijkl mnop`

**Step 3**: Copy it (we'll use it in next step)

---

### 3️⃣ Create .env File (1 minute)

In the `backend` folder, create a file named `.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://your-portfolio.vercel.app
PORT=5000
```

**Replace with your values:**

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-char app password (remove spaces!)
- `RECIPIENT_EMAIL`: Where you want to receive messages (usually same as EMAIL_USER)
- `FRONTEND_URL`: Your deployed portfolio URL

**Example:**

```env
EMAIL_USER=anirudh200503@gmail.com
EMAIL_PASS=xyzwabcd12345678
RECIPIENT_EMAIL=anirudh200503@gmail.com
FRONTEND_URL=https://anirudh-portfolio-one.vercel.app
PORT=5000
```

---

### 4️⃣ Test It! (1 minute)

#### Run the test script:

```bash
npm test
```

Or:

```bash
npm run test:email
```

**What happens:**

1. Checks your .env file
2. Tests SMTP connection
3. Sends a test email to your RECIPIENT_EMAIL

**Success looks like:**

```
🧪 Testing Email Configuration...

📋 Checking environment variables...
✅ All environment variables found

🔧 Creating SMTP transporter...
🔌 Testing SMTP connection...
✅ SMTP connection successful!

📧 Sending test email...
✅ Test email sent successfully!
📬 Message ID: <...>
📮 Email sent to: your-email@gmail.com

🎉 Your nodemailer setup is working perfectly!
💡 Check your email inbox to see the test email
```

**Check your inbox** - you should receive a beautiful test email!

---

## 🎯 Start the Server

### Development Mode:

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

**You should see:**

```
🚀 Portfolio backend server running on port 5000
📧 Contact form endpoint: http://localhost:5000/api/contact
❤️  Health check: http://localhost:5000/api/health
✅ SMTP transporter ready
✅ Email service is ready
```

---

## 🧪 Test Contact Form

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "Hello from the contact form!"
  }'
```

### Expected Response:

```json
{
  "success": true,
  "message": "Message sent successfully! Thank you for reaching out."
}
```

**Check your email** - you should receive the contact form submission!

---

## 🛠️ Troubleshooting

### Problem: "Invalid login"

✅ **Solution:**

- Make sure you're using App Password (not regular password)
- Remove ALL spaces from the app password
- Verify 2-Step Verification is enabled

### Problem: "SMTP connection timeout"

✅ **Solution:**

- Check internet connection
- Make sure port 465 isn't blocked
- Try disabling VPN if using one

### Problem: "Too many login attempts"

✅ **Solution:**

- Wait 15-30 minutes
- Generate a new App Password
- Don't spam test emails

### Problem: Test passes but frontend doesn't work

✅ **Solution:**

- Update `FRONTEND_URL` in `.env`
- Make sure frontend API_CONFIG points to backend URL
- Restart backend after .env changes

---

## 🌐 Deploy to Production

### Option 1: Render.com (Recommended - Free Tier)

1. Create account: https://render.com
2. **New Web Service** → Connect GitHub
3. **Settings:**
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. **Environment Variables**:
   - Add all variables from your `.env` file
5. **Deploy!**

Your backend URL will be: `https://your-app-name.onrender.com`

### Option 2: Railway.app

1. Create account: https://railway.app
2. **New Project** → GitHub
3. Set **Root Directory**: `backend`
4. Add environment variables
5. Deploy!

---

## 📧 What Emails Look Like

When someone submits your contact form, you'll receive:

**Subject**: `Portfolio Contact: [Their Subject]`

**Email Content**:

```
Portfolio Contact
-----------------

Contact Details:
Name: John Doe
Email: john@example.com
Subject: Project Inquiry

Message:
[Their message in a styled purple box]

---
This message was sent from your portfolio contact form.
Received on: Oct 23, 2025, 10:30 AM
```

**Reply Button**: Click reply to respond directly to the sender!

---

## 📁 File Structure

```
backend/
├── server-email.js          # Main server (fully configured!)
├── test-email.js           # Test script
├── package.json            # Dependencies
├── .env                    # Your credentials (YOU CREATE THIS)
├── .env.example            # Template
└── README-NODEMAILER-SETUP.md   # Full guide
```

---

## ✅ Quick Checklist

Before going live:

- [ ] `npm install` completed
- [ ] Gmail App Password created
- [ ] `.env` file created with correct values
- [ ] `npm test` passed successfully
- [ ] Test email received in inbox
- [ ] Backend started without errors
- [ ] Health check works: http://localhost:5000/api/health
- [ ] Frontend API_CONFIG updated with backend URL
- [ ] Environment variables added to hosting platform
- [ ] Contact form tested from frontend

---

## 🎉 You're Done!

Your contact form backend is **production-ready**!

**Next Steps:**

1. Deploy backend to Render/Railway
2. Update frontend `API_CONFIG` with backend URL
3. Test from live website
4. Start receiving messages! 📬

**Need Help?**

- Check `README-NODEMAILER-SETUP.md` for detailed docs
- Review `server-email.js` code comments
- Test with `npm test` command

---

**Questions?** Everything is already set up. Just add your Gmail credentials and deploy! 🚀
