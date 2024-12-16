import React from "react";
import Link from "next/link"; // Import Link from Next.js

const HamaTips: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white p-6 md:p-12 gap-6">
      {/* Video Section */}
      <div className="w-full md:w-1/2">
        <video
          className="rounded-lg w-full h-auto object-cover shadow-lg"
          src="/Image Eraser.mp4" // Replace with your video path
          autoPlay
          muted
          loop
        ></video>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Free Tips!</h2>
        <p className="text-gray-600 mb-6">
          Erase repeatedly for better performance!
        </p>
        <Link href="./object-remover"> {/* Add your target link */}
          <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300">
            Try it out!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HamaTips;
