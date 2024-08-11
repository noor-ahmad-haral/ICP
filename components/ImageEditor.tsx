// components/ImageEditor.tsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ImageEditor: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Remove unwanted objects from your photos with AI</h1>
      <p className="mb-4">The best free tool to clean up your pictures and remove any object, person, or watermark in 3 seconds. Easily delete undesired elements online from your image by painting over them.</p>
      <div className="flex items-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mr-4"
        />
        <button className="bg-purple-600 text-white py-2 px-4 rounded">Select a picture</button>
      </div>
      {selectedImage && (
        <div className="relative">
          <div className="flex justify-center mb-4">
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-96" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <label htmlFor="brushSize" className="mr-2">Brush Size</label>
              <input
                id="brushSize"
                type="range"
                min="1"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="mr-4"
              />
              <button className="bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={() => setBeforeAfter('before')}>Before</button>
              <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={() => setBeforeAfter('after')}>After</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
