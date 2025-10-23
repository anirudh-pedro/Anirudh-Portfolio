// Test Email Configuration
// Run this file to test your nodemailer setup
// Usage: node test-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log('\n🧪 Testing Email Configuration...\n');

    // Check environment variables
    console.log('📋 Checking environment variables...');
    const requiredVars = ['EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL'];
    const missing = requiredVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:', missing.join(', '));
        console.log('💡 Create a .env file with these variables');
        process.exit(1);
    }
    
    console.log('✅ All environment variables found\n');

    // Create transporter
    console.log('🔧 Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Verify connection
    try {
        console.log('🔌 Testing SMTP connection...');
        await transporter.verify();
        console.log('✅ SMTP connection successful!\n');
    } catch (error) {
        console.error('❌ SMTP connection failed:', error.message);
        console.log('\n💡 Troubleshooting:');
        console.log('   1. Make sure you\'re using an App Password, not your regular Gmail password');
        console.log('   2. Enable 2-Step Verification in your Google Account');
        console.log('   3. Generate a new App Password at: https://myaccount.google.com/apppasswords');
        console.log('   4. Remove all spaces from the app password in your .env file\n');
        process.exit(1);
    }

    // Send test email
    try {
        console.log('📧 Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: '✅ Portfolio Contact Form - Test Email',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
                        ✅ Test Email Successful!
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="font-size: 16px;">Congratulations! Your nodemailer setup is working correctly.</p>
                        
                        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 5px;">
                            <p style="margin: 0; color: #166534;"><strong>✓</strong> SMTP connection established</p>
                            <p style="margin: 5px 0 0 0; color: #166534;"><strong>✓</strong> Authentication successful</p>
                            <p style="margin: 5px 0 0 0; color: #166534;"><strong>✓</strong> Email sent successfully</p>
                        </div>
                        
                        <h3 style="color: #8B5CF6; margin-top: 30px;">Configuration Details:</h3>
                        <ul style="background-color: #f8f9fa; padding: 15px 15px 15px 35px; border-radius: 5px;">
                            <li><strong>Email User:</strong> ${process.env.EMAIL_USER}</li>
                            <li><strong>Recipient:</strong> ${process.env.RECIPIENT_EMAIL}</li>
                            <li><strong>SMTP Host:</strong> smtp.gmail.com</li>
                            <li><strong>Port:</strong> 465 (SSL/TLS)</li>
                            <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
                        </ul>
                        
                        <p style="margin-top: 30px;">Your contact form backend is ready to go! 🚀</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                        <p>This is a test email from your portfolio contact form setup.</p>
                        <p>If you received this, your nodemailer configuration is working perfectly!</p>
                    </div>
                </div>
            `
        });

        console.log('✅ Test email sent successfully!');
        console.log('📬 Message ID:', info.messageId);
        console.log('📮 Email sent to:', process.env.RECIPIENT_EMAIL);
        console.log('\n🎉 Your nodemailer setup is working perfectly!');
        console.log('💡 Check your email inbox to see the test email\n');

    } catch (error) {
        console.error('❌ Failed to send test email:', error.message);
        console.log('\n💡 This might be a temporary issue. Try running the test again.\n');
        process.exit(1);
    }
};

// Run the test
testEmail().catch(error => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
});
