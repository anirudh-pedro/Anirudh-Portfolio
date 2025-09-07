import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeViewer from '../About/ResumeViewer';
import { API_CONFIG } from '../../config/api';

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form status state with loading progress
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    progress: 0,
    info: { error: false, msg: null }
  });

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with timeout and retry
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setStatus(prevStatus => ({ ...prevStatus, submitting: true, progress: 0 }));
    
    // Simulate progress updates for better UX
    const progressInterval = setInterval(() => {
      setStatus(prev => {
        if (prev.progress < 90) {
          return { ...prev, progress: prev.progress + 10 };
        }
        return prev;
      });
    }, 1000);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 30000) // 30 second timeout
    );
    
    try {
      // Update progress to show connection attempt
      setStatus(prev => ({ ...prev, progress: 20 }));
      
      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(API_CONFIG.CONTACT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          // Add signal for better abort handling
          signal: AbortSignal.timeout(25000) // 25 second timeout
        }),
        timeoutPromise
      ]);
      
      clearInterval(progressInterval);
      setStatus(prev => ({ ...prev, progress: 80 }));
      
      const result = await response.json();
      
      setStatus(prev => ({ ...prev, progress: 100 }));
      
      if (response.ok && result.success) {
        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({
          submitted: true,
          submitting: false,
          progress: 100,
          info: { error: false, msg: result.message || 'Message sent successfully! Thank you for contacting me.' }
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus(prevStatus => ({
            ...prevStatus,
            submitted: false,
            progress: 0,
            info: { error: false, msg: null }
          }));
        }, 5000);
      } else {
        // Handle server errors
        setStatus({
          submitted: false,
          submitting: false,
          progress: 0,
          info: { error: true, msg: result.message || 'Failed to send message. Please try again.' }
        });
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      clearInterval(progressInterval);
      
      // Better error messages based on error type
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message === 'Request timed out' || error.name === 'TimeoutError') {
        errorMessage = 'The server is taking longer than expected. This might be because it\'s waking up from sleep mode. Please try again in a moment.';
      } else if (error.name === 'TypeError' || error.message.includes('fetch')) {
        errorMessage = 'Network connection error. Please check your internet connection and try again.';
      } else if (error.name === 'AbortError') {
        errorMessage = 'Request was cancelled. Please try again.';
      }
      
      setStatus({
        submitted: false,
        submitting: false,
        progress: 0,
        info: { error: true, msg: errorMessage }
      });
    }
  };

  // Function to wake up the server (call this on component mount)
  const wakeUpServer = async () => {
    try {
      fetch(API_CONFIG.HEALTH_URL, { 
        method: 'GET',
        cache: 'no-cache'
      }).catch(() => {
        // Silently fail - this is just to wake up the server
      });
    } catch {
      // Silently fail - this is just to wake up the server
    }
  };

  // Wake up server when component mounts
  React.useEffect(() => {
    wakeUpServer();
  }, []);

  return (
    <div className="space-y-8">
      {/* Contact Form Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/25 p-6 sm:p-8 shadow-xl shadow-black/50">
        <h3 className="text-xl font-bold mb-6 text-white flex items-center">
          <span className="mr-2 p-1.5 rounded-full bg-purple-500/20">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          Send Message
        </h3>
        
        {/* Form success message */}
        {status.info.msg && (
          <motion.div 
            className={`mb-6 p-4 rounded-lg ${status.info.error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {status.info.msg}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border ${errors.name ? 'border-red-400' : 'border-white/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-white text-sm placeholder-gray-400 autofill:bg-black/30 autofill:text-white`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-white text-sm placeholder-gray-400 autofill:bg-black/30 autofill:text-white`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>
          
          {/* Subject field */}
          <div className="mb-5">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border ${errors.subject ? 'border-red-400' : 'border-white/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-white text-sm placeholder-gray-400 autofill:bg-black/30 autofill:text-white`}
              placeholder="What is this regarding?"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
            )}
          </div>
          
          {/* Message field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border ${errors.message ? 'border-red-400' : 'border-white/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-white text-sm placeholder-gray-400 resize-none autofill:bg-black/30 autofill:text-white`}
              placeholder="Your message here..."
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>
          
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={status.submitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg text-white font-medium transition-all flex items-center justify-center disabled:opacity-70 relative overflow-hidden"
            >
              {status.submitting ? (
                <>
                  {/* Progress bar background */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-900 transition-all duration-300"
                    style={{ width: `${status.progress}%` }}
                  />
                  
                  {/* Loading content */}
                  <div className="relative z-10 flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {status.progress < 20 ? 'Connecting...' : 
                     status.progress < 50 ? 'Sending message...' :
                     status.progress < 90 ? 'Processing...' : 'Almost done...'}
                    <span className="ml-1 text-xs">({status.progress}%)</span>
                  </div>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
            
            {/* Loading tip */}
            {status.submitting && (
              <motion.p 
                className="text-xs text-gray-400 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                💡 Tip: The server might be waking up from sleep mode, which can take 15-30 seconds
              </motion.p>
            )}
          </div>
        </form>
      </div>

      {/* Resume Viewer Section - Now outside the form */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/25 p-2 sm:p-8 shadow-xl shadow-black/50">
        <ResumeViewer />
      </div>
    </div>
  );
};

export default ContactForm;