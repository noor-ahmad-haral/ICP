import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-600 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h5 className="uppercase mb-2 font-bold">Follow us</h5>
            {/* Add social media icons here */}
          </div>
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h5 className="uppercase mb-2 font-bold">Free tools</h5>
            <ul>
              <li className="mb-1">All AI tools</li>
              <li className="mb-1">AI Backgrounds</li>
              <li className="mb-1">AI Shadows</li>
              <li className="mb-1">AI Expand <span className="text-xs bg-red-500 px-2 py-1 rounded-full text-white">New</span></li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h5 className="uppercase mb-2 font-bold">Free apps</h5>
            <ul>
              <li className="mb-1">On the web</li>
              <li className="mb-1">iPhone app</li>
              <li className="mb-1">Android app</li>
              <li className="mb-1">API (developers)</li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h5 className="uppercase mb-2 font-bold">Company</h5>
            <ul>
              <li className="mb-1">About us</li>
              <li className="mb-1">Pricing</li>
              <li className="mb-1">Press Kit</li>
              <li className="mb-1">Blog</li>
            </ul>
          </div>
          <div className="w-full md:w-1/5">
            <h5 className="uppercase mb-2 font-bold">Help & legal</h5>
            <ul>
              <li className="mb-1">Help center</li>
              <li className="mb-1">Facebook community</li>
              <li className="mb-1">Terms & conditions</li>
              <li className="mb-1">Privacy policy</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
