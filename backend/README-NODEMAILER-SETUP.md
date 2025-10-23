# Portfolio Backend - Complete Nodemailer Setup Guide

This backend service is **fully configured** with Nodemailer for handling contact form submissions using Gmail SMTP.

## 📋 Features Already Implemented

✅ **Full Nodemailer integration** with Gmail SMTP  
✅ **SMTP connection pooling** for better performance  
✅ **Automatic reconnection** and retry logic  
✅ **Health check endpoint** (`/api/health`) for monitoring  
✅ **CORS enabled** for multiple origins (localhost + production)  
✅ **Email validation** and sanitization  
✅ **Beautiful HTML email templates** with professional styling  
✅ **Reply-to functionality** (replies go directly to sender)  
✅ **Production-ready error handling** with timeouts  
✅ **Cold start handling** for free hosting tiers

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Gmail App Password

#### Create Gmail App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Other** → Enter "Portfolio Backend"
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

⚠️ **Important**: Remove all spaces from the password!

### Step 3: Create .env File

Create a `.env` file in the `backend` folder:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
RECIPIENT_EMAIL=your-email@gmail.com

# Frontend URL (Production)
FRONTEND_URL=https://your-portfolio.vercel.app

# Server Port
PORT=5000
```

**Example:**

```env
EMAIL_USER=anirudh200503@gmail.com
EMAIL_PASS=xyzw1234abcd5678
RECIPIENT_EMAIL=anirudh200503@gmail.com
FRONTEND_URL=https://anirudh-portfolio-one.vercel.app
PORT=5000
```

---

## 🧪 Testing

### Start Server:

```bash
npm run dev
```

You should see:

```
🚀 Portfolio backend server running on port 5000
📧 Contact form endpoint: http://localhost:5000/api/contact
❤️  Health check: http://localhost:5000/api/health
✅ SMTP transporter ready
✅ Email service is ready
```

### Test with cURL:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message."
  }'
```

---

## 📡 API Endpoints

### 1. Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "Server and SMTP are ready",
  "smtpReady": true,
  "timestamp": "2025-10-23T10:30:00.000Z"
}
```

### 2. Send Contact Email

```http
POST /api/contact
```

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Message sent successfully! Thank you for reaching out."
}
```

---

## 🛠️ Troubleshooting

### ❌ "Invalid login" Error

**Solution:**

- Use **App Password**, NOT regular Gmail password
- Remove all spaces from app password in `.env`
- Verify 2-Step Verification is enabled
- Generate a new App Password if needed

### ❌ "SMTP connection timeout"

**Solution:**

- Check internet connection
- Verify port 465 is not blocked
- Check firewall settings

### ❌ "Too many login attempts"

**Solution:**

- Wait 15-30 minutes
- Generate new App Password
- Reduce test frequency

### ❌ CORS errors

**Solution:**

- Verify frontend URL in CORS origins (`server-email.js`)
- Update `FRONTEND_URL` in `.env`
- Restart backend server

---

## 🌐 Deployment

### Deploy to Render.com (Free Tier)

1. Create account at https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Settings:**
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave blank or set to `backend`
4. **Environment Variables**: Add all from `.env`
5. Click **Create Web Service**

**Note**: Free tier sleeps after 15 min inactivity. Frontend handles wake-up automatically.

### Deploy to Railway.app

1. Create account at https://railway.app
2. **New Project** → Deploy from GitHub
3. **Settings** → Set Root Directory to `backend`
4. **Variables** → Add environment variables
5. Deploy automatically triggers

---

## 📧 Email Features

### What You'll Receive:

When someone submits the contact form, you'll get an email with:

- **Professional HTML formatting**
- **Contact Details**: Name, Email, Subject
- **Message**: Styled with purple accent color
- **Timestamp**: When the message was received
- **Reply-to**: Click reply to respond directly to sender

### Email Template Preview:

```
Portfolio Contact

Contact Details:
Name: John Doe
Email: john@example.com
Subject: Project Inquiry

Message:
[Styled purple box with message content]

---
This message was sent from your portfolio contact form.
Received on: Oct 23, 2025, 10:30 AM
```

---

## 🔐 Security Features

✅ **Input validation** on all fields  
✅ **Email regex validation**  
✅ **CORS protection** with whitelist  
✅ **Environment variables** for sensitive data  
✅ **Timeout handling** (60 seconds)  
✅ **TLS encryption** for SMTP  
✅ **No credentials in code**

---

## 💡 Production Tips

1. **Monitor health endpoint** regularly
2. **Set up uptime monitoring** (UptimeRobot, Pingdom)
3. **Keep dependencies updated**: `npm audit fix`
4. **Enable logging** in production
5. **Use HTTPS** for frontend
6. **Test email delivery** regularly

---

## 📚 Technical Details

### Current Configuration:

- **SMTP Host**: smtp.gmail.com
- **Port**: 465 (SSL/TLS)
- **Connection Pooling**: Enabled
- **Max Connections**: 1 (free tier friendly)
- **Rate Limit**: 1 email per 2 seconds
- **Timeout**: 60 seconds
- **Auto-reconnect**: Yes
- **Retry Logic**: Single retry on failure

### Files Overview:

- `server-email.js` - Main Express server with Nodemailer
- `package.json` - Dependencies (express, nodemailer, cors, dotenv)
- `.env` - Environment variables (YOU CREATE THIS)
- `.env.example` - Template for environment variables

---

## 📖 Resources

- [Nodemailer Docs](https://nodemailer.com/)
- [Gmail SMTP Guide](https://support.google.com/mail/answer/7126229)
- [Google App Passwords](https://support.google.com/accounts/answer/185833)
- [Express.js Docs](https://expressjs.com/)

---

## ✅ Checklist

Before going live, ensure:

- [ ] `.env` file created with correct values
- [ ] Gmail App Password generated and added
- [ ] Server starts without errors
- [ ] Health check returns `smtpReady: true`
- [ ] Test email sent successfully
- [ ] Frontend API_CONFIG points to deployed backend
- [ ] CORS origins include production frontend URL
- [ ] Environment variables set on hosting platform

---

**Your backend is production-ready! Just add your Gmail credentials and deploy.**

**Need help?** Check troubleshooting section or contact support.
