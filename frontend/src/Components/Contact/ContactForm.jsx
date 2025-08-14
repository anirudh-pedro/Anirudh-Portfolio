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
  
  // Form status state
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      // Send form data to backend
      const response = await fetch(API_CONFIG.CONTACT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: result.message || 'Message sent successfully! Thank you for contacting me.' }
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus(prevStatus => ({
            ...prevStatus,
            submitted: false,
            info: { error: false, msg: null }
          }));
        }, 5000);
      } else {
        // Handle server errors
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: result.message || 'Failed to send message. Please try again.' }
        });
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Network error. Please check your connection and try again.' }
      });
    }
  };

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
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg text-white font-medium transition-all flex items-center justify-center disabled:opacity-70"
            >
              {status.submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
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