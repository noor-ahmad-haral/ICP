import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

const sampleImages = [
  { src: '/roll_items/roll_items01.webp', alt: 'Sample Image 1' },
  { src: '/roll_items/roll_items02.webp', alt: 'Sample Image 2' },
  { src: '/roll_items/roll_items03.webp', alt: 'Sample Image 3' },
];

const BackgroundRemoverPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showBefore, setShowBefore] = useState<boolean>(true);
  const [background, setBackground] = useState<string>('bg-transparent');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
      setProcessedImage(null);
      setError(null);
    }
  };

  const handleSampleImageClick = (src: string) => {
    setImage(null);
    setImageSrc(src);
    setProcessedImage(null);
    setError(null);
  };

  const handleImageUpload = async () => {
    if (!image && !imageSrc) return;

    setLoading(true);
    const formData = new FormData();
    if (image) {
      formData.append('file', image);
    } else if (imageSrc) {
      try {
        const response = await axios.get(imageSrc, { responseType: 'blob' });
        formData.append('file', response.data);
      } catch (error) {
        setError('Error downloading sample image');
        console.error('Error downloading sample image:', error);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/remove-bg', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.filepath) {
        setProcessedImage(response.data.filepath);
      } else {
        setError('Error in response data');
        console.error('Error in response data:', response.data);
      }
    } catch (error) {
      setError('Error uploading image');
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !processedImage) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = processedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      let bgColor: string;
      switch (background) {
        case 'bg-transparent':
          bgColor = 'transparent';
          break;
        case 'bg-white':
          bgColor = '#FFFFFF';
          break;
        case 'bg-black':
          bgColor = '#000000';
          break;
        case 'bg-gray-500':
          bgColor = '#6B7280';
          break;
        case 'bg-blue-500':
          bgColor = '#3B82F6';
          break;
        case 'bg-pink-500':
          bgColor = '#EC4899';
          break;
        case 'bg-yellow-500':
          bgColor = '#F59E0B';
          break;
        case 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500':
          bgColor = '#D8B4FE';
          break;
        default:
          bgColor = 'transparent';
      }
      if (background !== 'bg-transparent') {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'downloaded_image.png';
      link.click();
    };
    img.onerror = () => setError('Failed to load image for downloading.');
  };

  const backgroundColors = [
    'bg-transparent',
    'bg-white',
    'bg-black',
    'bg-gray-500',
    'bg-blue-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Head>
        <title>Background Remover</title>
      </Head>
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Background Remover</h1>
        <p className="mb-6 text-gray-600">
          Erase image backgrounds for free and replace them with different backgrounds of your choosing.
        </p>
        {!image && !imageSrc && (
          <>
            <div className="mb-4">
              <label className="bg-purple-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-purple-700 transition duration-300">
                Start from a photo
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-gray-600 mb-2">Or drop an image here</p>
            <p className="text-gray-600 mb-4">No picture on hand? Try with one of these:</p>
          </>
        )}
        {!image && !imageSrc && (
          <div className="flex justify-center mt-4 space-x-4">
            {sampleImages.map((sample, index) => (
              <div key={index} className="cursor-pointer" onClick={() => handleSampleImageClick(sample.src)}>
                <Image
                  src={sample.src}
                  alt={sample.alt}
                  width={70}
                  height={70}
                  className="rounded-lg border border-gray-300 hover:border-gray-500 transition duration-300"
                />
              </div>
            ))}
          </div>
        )}
        {(image || imageSrc) && (
          <div className="mt-4">
            <Image
              src={imageSrc || URL.createObjectURL(image!)}
              alt="Uploaded Image"
              width={300}
              height={300}
              className="mb-4 rounded-lg"
            />
          </div>
        )}
        {(image || imageSrc) && (
          <button
            onClick={handleImageUpload}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Processing...' : 'Remove Background'}
          </button>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        {processedImage && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Processed Image</h2>
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={() => setShowBefore(!showBefore)}
                className="bg-gray-500 text-white px-2 py-1 rounded mr-2 hover:bg-gray-600 transition duration-300"
              >
                {showBefore ? 'After' : 'Before'}
              </button>
              <div className="flex space-x-2">
                {backgroundColors.map((color, index) => (
                  <button
                    key={index}
                    className={`${color} w-8 h-8 rounded-full border-2 ${background === color ? 'border-black' : 'border-transparent'} transition duration-300`}
                    onClick={() => setBackground(color)}
                  ></button>
                ))}
              </div>
            </div>
            {background === 'bg-transparent' ? (
              <div className="relative">
                <Image
                  src={showBefore ? (imageSrc || URL.createObjectURL(image!)) : processedImage}
                  alt="Processed Image"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className={`relative ${background} p-4 rounded-lg max-w-[300px] h-[300px] mx-auto`}>
                <Image
                  src={showBefore ? (imageSrc || URL.createObjectURL(image!)) : processedImage}
                  alt="Processed Image"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            <button
              onClick={handleDownload}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemoverPage;
