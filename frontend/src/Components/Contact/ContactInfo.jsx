import React from 'react';

const ContactInfo = () => {
  const contactDetails = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'anirudh200503@gmail.com',
      link: 'mailto:anirudh200503@gmail.com'
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: '+91 9894969187',
      link: 'tel:+919894969187'
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      value: 'Coimbatore, India',
      link: null
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/25 p-6 sm:p-8 shadow-xl shadow-black/50">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        <span className="mr-2 p-1.5 rounded-full bg-purple-500/20">
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Contact Information
      </h3>
      
      <div className="space-y-5">
        {contactDetails.map(item => (
          <div key={item.id} className="flex items-start">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mr-4">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">{item.title}</h4>
              {item.link ? (
                <a 
                  href={item.link} 
                  className="text-white hover:text-blue-400 transition-colors text-base"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white text-base">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-700/50">
        <p className="text-gray-400 text-sm">
          I'm always interested in new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;