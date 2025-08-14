# Portfolio Backend with Email Integration

A Node.js Express server that handles contact form submissions and automatically sends emails using Gmail.

## Features

- ✅ Contact form submission handling
- ✅ Automatic email notifications to you
- ✅ Auto-reply emails to visitors
- ✅ Gmail integration with App Passwords
- ✅ Input validation and sanitization
- ✅ CORS support for frontend
- ✅ Professional HTML email templates
- ✅ Error handling and logging

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Gmail Setup (Required)

#### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

#### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Copy the generated 16-character password

#### Step 3: Configure Environment Variables

Update the `.env` file with your details:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
RECIPIENT_EMAIL=your-actual-email@gmail.com
```

**Important:**

- `EMAIL_USER`: Your actual Gmail address
- `EMAIL_PASS`: The 16-character App Password (NOT your regular Gmail password)
- `RECIPIENT_EMAIL`: Where you want to receive contact form messages

### 3. Start the Server

**Development Mode (with auto-restart):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

## API Endpoints

### POST `/api/contact`

Handles contact form submissions and sends emails.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Portfolio Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Message sent successfully! Thank you for reaching out. You should receive a confirmation email shortly."
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "All fields are required"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Email Features

### 1. Notification Email (to you)

- Professional HTML template
- Contains all contact details
- Formatted message content
- Timestamp information
- Sender's email as reply-to

### 2. Auto-Reply Email (to visitor)

- Thank you message
- Message summary
- Professional signature
- Response time expectations

## Frontend Integration

Update your contact form to use the backend:

```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      // Show success message
      console.log("Email sent successfully!");
    } else {
      // Show error message
      console.error("Error:", result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

## Troubleshooting

### Common Issues

**1. "Authentication failed" error:**

- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Factor Authentication is enabled
- Double-check the EMAIL_USER and EMAIL_PASS in .env

**2. "Invalid email address" error:**

- Check that EMAIL_USER contains a valid Gmail address
- Ensure there are no extra spaces in the .env file

**3. CORS errors:**

- Verify FRONTEND_URL matches your frontend development server
- Default is `http://localhost:5173` for Vite

**4. Server won't start:**

- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`

### Testing Email Configuration

The server automatically tests the email configuration on startup. Look for:

- ✅ "Email service is ready" - Configuration is correct
- ❌ "Email configuration error" - Check your credentials

### Production Deployment

1. Update environment variables for production
2. Use your production domain in FRONTEND_URL
3. Consider using environment-specific email templates
4. Set up proper error monitoring

## Security Notes

- Never commit your .env file to version control
- Use App Passwords instead of regular passwords
- Keep your credentials secure
- Consider rate limiting for production use

## Email Template Customization

Email templates are embedded in the server code. To customize:

1. Edit the HTML in `notificationMailOptions.html`
2. Modify the auto-reply in `autoReplyMailOptions.html`
3. Update colors, styling, and content as needed

## Logs and Monitoring

The server logs important events:

- ✅ Successful email sends
- ❌ Email errors
- 📝 Contact form submissions
- 🚀 Server startup information

Monitor these logs to ensure everything is working correctly.
