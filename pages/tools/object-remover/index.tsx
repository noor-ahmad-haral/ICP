// pages/object-remover/index.tsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ObjectRemover: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('before');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Remove unwanted objects from your photos with AI</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        The best free tool to clean up your pictures and remove any object, person, or watermark in 3 seconds. Easily delete undesired elements online from your image by painting over them.
      </p>
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md cursor-pointer transition transform hover:bg-purple-700 hover:scale-105">
          Select a picture
        </label>
      </div>
      {selectedImage && (
        <div className="relative mb-10 p-4 bg-white rounded-lg shadow-lg">
          <img src={selectedImage} alt="Selected" className="max-w-full max-h-96 rounded-lg" />
          <div className="absolute top-4 left-4 flex items-center bg-white bg-opacity-75 p-2 rounded-lg shadow-md">
            <label htmlFor="brushSize" className="mr-2 text-gray-700">Brush Size</label>
            <input
              id="brushSize"
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="mr-4"
            />
          </div>
          <div className="absolute top-4 right-4 flex">
            <button
              className={`py-2 px-4 rounded-lg shadow-md mr-2 transition transform ${beforeAfter === 'before' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setBeforeAfter('before')}
            >
              Before
            </button>
            <button
              className={`py-2 px-4 rounded-lg shadow-md transition transform ${beforeAfter === 'after' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setBeforeAfter('after')}
            >
              After
            </button>
          </div>
        </div>
      )}
      <div className="text-center">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md mr-4 transition transform hover:bg-blue-700 hover:scale-105">Edit in Photoroom</button>
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition transform hover:bg-green-700 hover:scale-105">Download</button>
      </div>
    </div>
  );
};

export default ObjectRemover;
