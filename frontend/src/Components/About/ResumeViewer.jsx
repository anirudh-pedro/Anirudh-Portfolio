import React, { useState } from 'react';

const ResumeViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Path to your resume PDF
  const resumePath = "/my-resume-1.pdf"; // Place your PDF in the public folder

  // Handle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle download
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = "Anirudh_Resume.pdf"; // Name the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3 sm:p-4 max-w-3xl mx-auto"
      style={{
        opacity: 1,
        y: 0
      }}
    >
        <h3 className="display-font text-lg sm:text-xl font-semibold mb-2 text-slate-900 flex items-center justify-center">
          <span className="mr-2 p-1.5 rounded-full bg-slate-200">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          My Resume
        </h3>

        <div className="flex flex-col items-center justify-center gap-3 mt-2">
          <div className="text-slate-600 text-xs sm:text-sm text-center max-w-md">
            View or download my professional resume to learn more about my experience.
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={toggleModal}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 backdrop-blur-sm border border-slate-300/70 rounded-full text-slate-800 text-xs sm:text-sm font-medium flex items-center transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Resume
            </button>
            
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold flex items-center transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>

      {/* Modal for PDF Viewer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white backdrop-blur-xl rounded-xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden border border-slate-300/70 shadow-xl shadow-slate-400/30">
            {/* Modal header */}
            <div className="flex items-center justify-between p-3 border-b border-slate-300/60">
              <h3 className="text-lg font-semibold text-slate-900">Resume Preview</h3>
              <button 
                onClick={toggleModal}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* PDF content with rotation fixed */}
            <div className="flex-1 overflow-auto bg-slate-100 flex items-center justify-center">
              <iframe 
                src={`${resumePath}#view=FitH&toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=100`}
                title="Resume"
                className="w-full h-full border-0"
              />
            </div>
            
            {/* Modal footer with controls - Removed "Press Esc to close" text */}
            <div className="p-3 border-t border-slate-300/60 flex justify-end items-center">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-white text-sm font-semibold flex items-center transition-all shadow-lg" 
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;