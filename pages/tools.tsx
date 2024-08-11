import React from 'react';
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Tool {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

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
    link: '/image-denoiser',
  },
  {
    title: 'AI Colorizer',
    description: 'Colorize your black and white photos with AI',
    imageUrl: '/tools-images/AI-colorizer.jpg',
    link: '/colorizer',
  },
  {
    title: 'Image Sketcher',
    description: 'Turn your photos into beautiful sketches with AI',
    imageUrl: '/tools-images/sketck.webp',
    link: '/image-sketcher',
  },
];

const ToolsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "violet" }}>AI Photo Editing</h1>
        <h2 className="text-4xl font-bold text-center mb-8">Tools & Features</h2>
        <p className="text-lg text-center mb-8">Create stunning images in seconds with AI-powered technology.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <a href={tool.link}> {/* Use a regular <a> tag */}
                <div className="relative h-48">
                  <Image src={tool.imageUrl} alt={tool.title} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                  <p className="text-sm">{tool.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ToolsPage;
