import React from 'react';
import { motion } from 'framer-motion';
import ContactHeader from '../Components/Contact/ContactHeader';
import ContactForm from '../Components/Contact/ContactForm';
import ContactInfo from '../Components/Contact/ContactInfo';
import SocialLinks from '../Components/Contact/SocialLinks';


const Contact = () => {
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <motion.div 
        className="container mx-auto px-4 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <ContactHeader />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left side - Contact info and social links */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <ContactInfo />
            <SocialLinks />
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;