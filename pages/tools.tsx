// //Without Authentication 
// import React from 'react';
// import Image from 'next/image';
// import Header from "@/components/Header";
// import Footer from "@/components/footer";

// interface Tool {
//   title: string;
//   description: string;
//   imageUrl: string;
//   link: string;
// }

// const tools: Tool[] = [
//   {
//     title: 'AI Background Remover',
//     description: 'Remove the background of your image automatically',
//     imageUrl: '/tools-images/background-remover.jpg',
//     link: '/tools/background-remover',
//   },
//   {
//     title: 'AI Image Upscaler',
//     description: 'Generate realistic backgrounds in less than a second',
//     imageUrl: '/tools-images/Image-Upscaler.png',
//     link: '/tools/image-upscaler',
//   },
//   {
//     title: 'Unwanted Object Remover',
//     description: 'Remove unwanted parts of your image with a swipe',
//     imageUrl: '/tools-images/object-remover.jpeg',
//     link: 'tools/object-remover',
//   },
//   {
//     title: 'Image Denoiser',
//     description: 'Remove noise from your images to make them clearer',
//     imageUrl: '/tools-images/image-denoise.jpg',
//     link: 'tools/image-denoiser',
//   },
//   {
//     title: 'AI Colorizer',
//     description: 'Colorize your black and white photos with AI',
//     imageUrl: '/tools-images/AI-colorizer.jpg',
//     link: 'tools/ai-colorizer',
//   },
//   {
//     title: 'Image Sketcher',
//     description: 'Turn your photos into beautiful sketches with AI',
//     imageUrl: '/tools-images/sketck.webp',
//     link: 'tools/image-to-sketch',
//   },
//   {
//     title: 'Black and White Filter',
//     description: 'Convert your pictures to monochrome and download them for free.',
//     imageUrl: '/tools-images/grayscale.png',
//     link: 'tools/image-to-grayscale',
//   },
//   {
//     title: 'Sepia Filter',
//     description: 'Perfect for infusing a nostalgic, timeless feel into modern photographs.',
//     imageUrl: '/tools-images/sepia.png',
//     link: 'tools/image-to-sepia',
//   },
// ];

// const ToolsPage: React.FC = () => {
//   return (
//     <>
//       <Header />
//       <div className="container mx-auto p-8">
//         <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "violet" }}>AI Photo Editing</h1>
//         <h2 className="text-4xl font-bold text-center mb-8">Tools & Features</h2>
//         <p className="text-lg text-center mb-8">Create stunning images in seconds with AI-powered technology.</p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {tools.map((tool, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <a href={tool.link}> {/* Use a regular <a> tag */}
//                 <div className="relative h-48">
//                   <Image src={tool.imageUrl} alt={tool.title} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300" />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
//                   <p className="text-sm">{tool.description}</p>
//                 </div>
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ToolsPage;

//with Authentication but no pop up
// import React from 'react';
// import Image from 'next/image';
// import Header from "@/components/Header";
// import Footer from "@/components/footer";
// import { useSession, signIn } from 'next-auth/react'; // Import useSession and signIn
// import { useRouter } from 'next/router';

// interface Tool {
//   title: string;
//   description: string;
//   imageUrl: string;
//   link: string;
// }

// const tools: Tool[] = [
//   {
//     title: 'AI Background Remover',
//     description: 'Remove the background of your image automatically',
//     imageUrl: '/tools-images/background-remover.jpg',
//     link: '/tools/background-remover',
//   },
//   {
//     title: 'AI Image Upscaler',
//     description: 'Generate realistic backgrounds in less than a second',
//     imageUrl: '/tools-images/Image-Upscaler.png',
//     link: '/tools/image-upscaler',
//   },
//   {
//     title: 'Unwanted Object Remover',
//     description: 'Remove unwanted parts of your image with a swipe',
//     imageUrl: '/tools-images/object-remover.jpeg',
//     link: 'tools/object-remover',
//   },
//   {
//     title: 'Image Denoiser',
//     description: 'Remove noise from your images to make them clearer',
//     imageUrl: '/tools-images/image-denoise.jpg',
//     link: 'tools/image-denoiser',
//   },
//   {
//     title: 'AI Colorizer',
//     description: 'Colorize your black and white photos with AI',
//     imageUrl: '/tools-images/AI-colorizer.jpg',
//     link: 'tools/ai-colorizer',
//   },
//   {
//     title: 'Image Sketcher',
//     description: 'Turn your photos into beautiful sketches with AI',
//     imageUrl: '/tools-images/sketck.webp',
//     link: 'tools/image-to-sketch',
//   },
//   {
//     title: 'Black and White Filter',
//     description: 'Convert your pictures to monochrome and download them for free.',
//     imageUrl: '/tools-images/grayscale.png',
//     link: 'tools/image-to-grayscale',
//   },
//   {
//     title: 'Sepia Filter',
//     description: 'Perfect for infusing a nostalgic, timeless feel into modern photographs.',
//     imageUrl: '/tools-images/sepia.png',
//     link: 'tools/image-to-sepia',
//   },
// ];

// const ToolsPage: React.FC = () => {
//   const { data: session } = useSession(); // Get session
//   const router = useRouter();

//   const handleToolClick = (link: string) => {
//     if (!session) {
//       signIn(); // If not logged in, redirect to login
//     } else {
//       router.push(link); // If logged in, proceed to the tool page
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto p-8">
//         <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "violet" }}>AI Photo Editing</h1>
//         <h2 className="text-4xl font-bold text-center mb-8">Tools & Features</h2>
//         <p className="text-lg text-center mb-8">Create stunning images in seconds with AI-powered technology.</p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {tools.map((tool, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleToolClick(tool.link)}>
//               <div className="relative h-48">
//                 <Image src={tool.imageUrl} alt={tool.title} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300" />
//               </div>
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
//                 <p className="text-sm">{tool.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ToolsPage;


//with Authentication and pop up
// Import React dependencies
import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSession, signIn } from 'next-auth/react'; // Import useSession and signIn
import { useRouter } from 'next/router';
import Modal from 'react-modal'; // Import react-modal

// Interface for tool data
interface Tool {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Tools data array
const tools: Tool[] = [
  {
    title: 'AI Background Remover',
    description: 'Remove the background of your image automatically',
    imageUrl: '/tools-images/background-remover.jpg',
    link: '/tools/background-remover',
  },
  {
    title: 'AI Image Upscaler',
    description: 'Generate realistic backgrounds in less than a second',
    imageUrl: '/tools-images/Image-Upscaler.png',
    link: '/tools/image-upscaler',
  },
  {
    title: 'Unwanted Object Remover',
    description: 'Remove unwanted parts of your image with a swipe',
    imageUrl: '/tools-images/object-remover.jpeg',
    link: 'tools/object-remover',
  },
  {
    title: 'Image Denoiser',
    description: 'Remove noise from your images to make them clearer',
    imageUrl: '/tools-images/image-denoise.jpg',
    link: 'tools/image-denoiser',
  },
  {
    title: 'AI Colorizer',
    description: 'Colorize your black and white photos with AI',
    imageUrl: '/tools-images/AI-colorizer.jpg',
    link: 'tools/ai-colorizer',
  },
  {
    title: 'Image Sketcher',
    description: 'Turn your photos into beautiful sketches with AI',
    imageUrl: '/tools-images/sketck.webp',
    link: 'tools/image-to-sketch',
  },
  {
    title: 'Black and White Filter',
    description: 'Convert your pictures to monochrome and download them for free.',
    imageUrl: '/tools-images/grayscale.png',
    link: 'tools/image-to-grayscale',
  },
  {
    title: 'Sepia Filter',
    description: 'Perfect for infusing a nostalgic, timeless feel into modern photographs.',
    imageUrl: '/tools-images/sepia.png',
    link: 'tools/image-to-sepia',
  },
  {
    title: 'Text to Image Generator',
    description: 'Turn your words into stunning visuals with our AI-powered text-to-image tool.',
    imageUrl: '/tools-images/text-to-image.png',
    link: 'tools/text-to-image',
  },
  {
    title: 'Face Swap',
    description: 'Seamlessly swap faces in your photos with our powerful AI tool.',
    imageUrl: '/tools-images/face-swap-1.jpeg',
    link: 'tools/face-swap',
  },
];

// Tools Page component
const ToolsPage: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Handle clicking a tool
  const handleToolClick = (link: string) => {
    if (!session) {
      setIsModalOpen(true); // Open the modal if user is not authenticated
    } else {
      router.push(link); // Navigate to the tool page if logged in
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "violet" }}>AI Photo Editing</h1>
        <h2 className="text-4xl font-bold text-center mb-8">Tools & Features</h2>
        <p className="text-lg text-center mb-8">Create stunning images in seconds with AI-powered technology.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleToolClick(tool.link)}
            >
              <div className="relative h-48">
                <Image
                  src={tool.imageUrl}
                  alt={tool.title}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-sm">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for prompting user to log in */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Required"
        className="modal-content bg-white p-6 rounded-lg shadow-xl"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
        <p className="text-center mb-6">You need to be logged in to access this tool. Please log in to continue.</p>
        <div className="text-center">
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 ml-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default ToolsPage;
