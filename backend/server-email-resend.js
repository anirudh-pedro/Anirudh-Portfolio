const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
    origin: [
        'http://localhost:5173', // Local development
        'https://anirudh-portfolio-one.vercel.app', // Production frontend
        'https://anirudh-portfolio-lxuq.onrender.com', // Backend on Render
        process.env.FRONTEND_URL // Additional flexibility
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Portfolio Backend Server is running!',
        status: 'active',
        emailService: 'Resend',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const hasApiKey = Boolean(process.env.RESEND_API_KEY);
    const hasFromEmail = Boolean(process.env.FROM_EMAIL);
    const hasRecipient = Boolean(process.env.RECIPIENT_EMAIL);
    
    const isReady = hasApiKey && hasFromEmail && hasRecipient;
    
    res.status(isReady ? 200 : 503).json({
        success: isReady,
        message: isReady ? 'Server and email service are ready' : 'Server configuration incomplete',
        emailReady: isReady,
        config: {
            hasApiKey,
            hasFromEmail,
            hasRecipient
        },
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const timeout = setTimeout(() => {
        if (!res.headersSent) {
            res.status(408).json({
                success: false,
                message: 'Request timeout. Please try again.'
            });
        }
    }, 30000); // 30 second timeout (Resend is much faster than SMTP)

    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            clearTimeout(timeout);
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            clearTimeout(timeout);
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Check environment variables
        if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.RECIPIENT_EMAIL) {
            clearTimeout(timeout);
            return res.status(503).json({
                success: false,
                message: 'Email service is not configured. Please contact the administrator.'
            });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL, // Must be verified domain email
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email, // User's email for easy replies
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">New Portfolio Contact</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #8B5CF6; margin-bottom: 5px;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #8B5CF6; margin-bottom: 5px;">Message:</h3>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #8B5CF6;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                        <p>This message was sent from your portfolio contact form.</p>
                        <p>Reply directly to this email to respond to ${name}.</p>
                        <p>Received on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        });

        clearTimeout(timeout);

        if (error) {
            console.error('❌ Resend error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to send message. Please try again later.'
            });
        }

        console.log('✅ Email sent successfully:', data?.id);
        console.log('📝 Contact form submission:', {
            name,
            email,
            subject,
            timestamp: new Date().toISOString()
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! Thank you for reaching out.',
            emailId: data?.id
        });

    } catch (error) {
        clearTimeout(timeout);
        console.error('❌ Error processing contact form:', error);
        
        let errorMessage = 'Something went wrong. Please try again later or contact me directly.';
        let statusCode = 500;
        
        if (error.message?.includes('API key')) {
            errorMessage = 'Email service configuration error. Please contact the administrator.';
            statusCode = 503;
        }
        
        if (!res.headersSent) {
            res.status(statusCode).json({
                success: false,
                message: errorMessage
            });
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on port ${PORT}`);
    console.log(`📧 Email service: Resend`);
    console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS enabled for:`);
    console.log(`   • http://localhost:5173`);
    console.log(`   • https://anirudh-portfolio-one.vercel.app`);
    console.log(`   • https://anirudh-portfolio-lxuq.onrender.com`);
    
    // Check configuration
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️  RESEND_API_KEY is not set!');
    }
    if (!process.env.FROM_EMAIL) {
        console.warn('⚠️  FROM_EMAIL is not set!');
    }
    if (!process.env.RECIPIENT_EMAIL) {
        console.warn('⚠️  RECIPIENT_EMAIL is not set!');
    }
    
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL && process.env.RECIPIENT_EMAIL) {
        console.log('✅ Email service configured and ready!');
    }
});
