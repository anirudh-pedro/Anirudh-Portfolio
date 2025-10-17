const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:5173', // Local development
        'http://localhost:5174', // Local development (alternate port)
        'https://anirudh-portfolio-one.vercel.app', // Production frontend
        process.env.FRONTEND_URL // Additional flexibility
    ].filter(Boolean), // Remove any undefined values
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const testEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email service is ready');
    } catch (error) {
        console.log('❌ Email configuration error:', error.message);
        console.log('📧 Please check your EMAIL_USER and EMAIL_PASS in .env file');
    }
};

app.get('/', (req, res) => {
    res.json({ 
        message: 'Portfolio Backend Server is running!',
        status: 'active',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/contact', async (req, res) => {
    // Set a timeout for the entire operation
    const timeout = setTimeout(() => {
        if (!res.headersSent) {
            res.status(408).json({
                success: false,
                message: 'Request timeout. Please try again.'
            });
        }
    }, 25000); // 25 second timeout

    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        const transporter = createTransporter();

        // Email content to you (notification)
        const notificationMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email, // This makes replies go directly to the user
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">Portfolio reply</h2>
                    
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
                        <p>Received on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        };

        // Send notification email to you
        await transporter.sendMail(notificationMailOptions);
        console.log('📧 Notification email sent to:', process.env.RECIPIENT_EMAIL);

        // Clear timeout and send response
        clearTimeout(timeout);

        // Log the contact attempt
        console.log('📝 New contact form submission:', {
            name,
            email,
            subject,
            timestamp: new Date().toISOString()
        });

        if (!res.headersSent) {
            res.status(200).json({
                success: true,
                message: 'Message sent successfully! Thank you for reaching out.'
            });
        }

    } catch (error) {
        clearTimeout(timeout);
        console.error('❌ Error sending email:', error);
        
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again later or contact me directly.'
            });
        }
    }
});

// Start server and test email configuration
app.listen(PORT, async () => {
    console.log(`🚀 Portfolio backend server running on port ${PORT}`);
    console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS enabled for multiple origins:`);
    console.log(`   • http://localhost:5173 (local development)`);
    console.log(`   • https://anirudh-portfolio-one.vercel.app (production)`);
    console.log(`   • ${process.env.FRONTEND_URL || 'none'} (environment variable)`);
    
    // Test email configuration on startup
    await testEmailConfig();
    
    
   
});
