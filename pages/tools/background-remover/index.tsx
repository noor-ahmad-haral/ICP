// import React, { useState, useRef, useEffect } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import axios from 'axios';
// import Header from '@/components/Header';
// import Footer from '@/components/footer';
// import { Brush } from 'lucide-react';

// const sampleImages = [
//   { src: '/roll_items/roll_items01.webp', alt: 'Sample Image 1' },
//   { src: '/roll_items/roll_items02.webp', alt: 'Sample Image 2' },
//   { src: '/roll_items/roll_items03.webp', alt: 'Sample Image 3' },
// ];

// const BackgroundRemoverPage: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [processedImage, setProcessedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showBefore, setShowBefore] = useState<boolean>(true);
//   const [background, setBackground] = useState<string>('bg-transparent');
//   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
//   const [brushSize, setBrushSize] = useState<number>(10);
//   const [isErasing, setIsErasing] = useState<boolean>(false);
//   const [customBackground, setCustomBackground] = useState<string | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(event.target.files[0]);
//       setImageSrc(URL.createObjectURL(event.target.files[0]));
//       setProcessedImage(null);
//       setError(null);
//     }
//   };

//   const handleSampleImageClick = (src: string) => {
//     setImage(null);
//     setImageSrc(src);
//     setProcessedImage(null);
//     setError(null);
//   };

//   const handleImageUpload = async () => {
//     if (!image && !imageSrc) return;

//     setLoading(true);
//     const formData = new FormData();
//     if (image) {
//       formData.append('file', image);
//     } else if (imageSrc) {
//       try {
//         const response = await axios.get(imageSrc, { responseType: 'blob' });
//         formData.append('file', response.data);
//       } catch (error) {
//         setError('Error downloading sample image');
//         console.error('Error downloading sample image:', error);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/remove-bg', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.data.filepath) {
//         setProcessedImage(response.data.filepath);
//       } else {
//         setError('Error in response data');
//         console.error('Error in response data:', response.data);
//       }
//     } catch (error) {
//       setError('Error uploading image');
//       console.error('Error uploading image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (processedImage) {
//       updateCanvas();
//     }
//   }, [processedImage, background, showBefore, customBackground]);

//   const updateCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || (!processedImage && !imageSrc)) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     contextRef.current = context;

//     const img = new window.Image();
//     img.crossOrigin = 'anonymous';
//     img.src = showBefore ? (imageSrc || '') : processedImage || '';
//     img.onload = () => {
//       const maxWidth = 300;
//       const maxHeight = 300;
//       const aspectRatio = img.width / img.height;
      
//       let newWidth = maxWidth;
//       let newHeight = maxWidth / aspectRatio;

//       if (newHeight > maxHeight) {
//         newHeight = maxHeight;
//         newWidth = maxHeight * aspectRatio;
//       }

//       setCanvasSize({ width: newWidth, height: newHeight });

//       canvas.width = newWidth;
//       canvas.height = newHeight;

//       if (!showBefore) {
//         if (customBackground) {
//           const bgImg = new window.Image();
//           bgImg.crossOrigin = 'anonymous';
//           bgImg.src = customBackground;
//           bgImg.onload = () => {
//             context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
//             context.drawImage(img, 0, 0, newWidth, newHeight);
//           };
//         } else {
//           const bgColor = getBackgroundColor(background);
//           if (bgColor !== 'transparent') {
//             context.fillStyle = bgColor;
//             context.fillRect(0, 0, canvas.width, canvas.height);
//           }
//           context.drawImage(img, 0, 0, newWidth, newHeight);
//         }
//       } else {
//         context.drawImage(img, 0, 0, newWidth, newHeight);
//       }
//     };
//     img.onerror = () => setError('Failed to load image for processing.');
//   };

//   const getBackgroundColor = (bg: string): string => {
//     switch (bg) {
//       case 'bg-transparent': return 'transparent';
//       case 'bg-white': return '#FFFFFF';
//       case 'bg-black': return '#000000';
//       case 'bg-gray-500': return '#6B7280';
//       case 'bg-blue-500': return '#3B82F6';
//       case 'bg-pink-500': return '#EC4899';
//       case 'bg-yellow-500': return '#F59E0B';
//       case 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500':
//         return 'linear-gradient(to right, #D8B4FE, #EC4899, #EF4444)';
//       default: return 'transparent';
//     }
//   };

//   const handleDownload = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const link = document.createElement('a');
//     link.href = canvas.toDataURL('image/png');
//     link.download = 'processed_image.png';
//     link.click();
//   };

//   const handleBrushSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBrushSize(Number(e.target.value));
//   };

//   const startErasing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsErasing(true);
//     erase(e);
//   };

//   const stopErasing = () => {
//     setIsErasing(false);
//   };

//   const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isErasing || !contextRef.current) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     contextRef.current.globalCompositeOperation = 'destination-out';
//     contextRef.current.beginPath();
//     contextRef.current.arc(x, y, brushSize / 2, 0, Math.PI * 2);
//     contextRef.current.fill();
//   };

//   const handleCustomBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setCustomBackground(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   const backgroundColors = [
//     'bg-transparent',
//     'bg-white',
//     'bg-black',
//     'bg-gray-500',
//     'bg-blue-500',
//     'bg-pink-500',
//     'bg-yellow-500',
//     'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
//   ];

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
//         <Head>
//           <title>Background Remover</title>
//         </Head>
//         <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-2xl w-full">
//           <h1 className="text-4xl font-bold mb-4 text-gray-800">Background Remover</h1>
//           <p className="mb-6 text-gray-600">
//             Erase image backgrounds for free and replace them with different backgrounds of your choosing.
//           </p>
//           {!image && !imageSrc && (
//             <>
//               <div className="mb-4">
//                 <label className="bg-purple-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-purple-700 transition duration-300">
//                   Start from a photo
//                   <input type="file" className="hidden" onChange={handleImageChange} />
//                 </label>
//               </div>
//               <p className="text-gray-600 mb-2">Or drop an image here</p>
//               <p className="text-gray-600 mb-4">No picture on hand? Try with one of these:</p>
//               <div className="flex justify-center mt-4 space-x-4">
//                 {sampleImages.map((sample, index) => (
//                   <div key={index} className="cursor-pointer" onClick={() => handleSampleImageClick(sample.src)}>
//                     <Image
//                       src={sample.src}
//                       alt={sample.alt}
//                       width={70}
//                       height={70}
//                       className="rounded-lg border border-gray-300 hover:border-gray-500 transition duration-300"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//           {(image || imageSrc) && (
//             <div className="mt-4">
//               <Image
//                 src={imageSrc || URL.createObjectURL(image!)}
//                 alt="Uploaded Image"
//                 width={300}
//                 height={300}
//                 className="mb-4 rounded-lg object-contain"
//               />
//               <button
//                 onClick={handleImageUpload}
//                 className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//               >
//                 {loading ? 'Processing...' : 'Remove Background'}
//               </button>
//             </div>
//           )}
//           {error && (
//             <div className="mt-4 text-red-500">
//               <p>{error}</p>
//             </div>
//           )}
//           {processedImage && (
//             <div className="mt-4">
//               <h2 className="text-2xl font-bold mb-2 text-gray-800">Processed Image</h2>
//               <div className="flex justify-center items-center mb-4">
//                 <button
//                   onClick={() => setShowBefore(!showBefore)}
//                   className="bg-gray-500 text-white px-2 py-1 rounded mr-2 hover:bg-gray-600 transition duration-300"
//                 >
//                   {showBefore ? 'After' : 'Before'}
//                 </button>
//                 <div className="flex space-x-2">
//                   {backgroundColors.map((color, index) => (
//                     <button
//                       key={index}
//                       className={`${color} w-8 h-8 rounded-full border-2 ${background === color ? 'border-black' : 'border-transparent'} transition duration-300`}
//                       onClick={() => setBackground(color)}
//                     ></button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition duration-300">
//                   Upload Custom Background
//                   <input type="file" className="hidden" onChange={handleCustomBackgroundUpload} />
//                 </label>
//               </div>
//               <div className={`relative ${background} p-4 rounded-lg mx-auto flex justify-center items-center`} style={{ width: '300px', height: '300px' }}>
//                 <canvas
//                   ref={canvasRef}
//                   className="rounded-lg"
//                   style={{
//                     width: `${canvasSize.width}px`,
//                     height: `${canvasSize.height}px`,
//                     maxWidth: '100%',
//                     maxHeight: '100%',
//                     objectFit: 'contain'
//                   }}
//                   onMouseDown={startErasing}
//                   onMouseMove={erase}
//                   onMouseUp={stopErasing}
//                   onMouseLeave={stopErasing}
//                 />
//               </div>
//               {!showBefore && (
//                 <div className="mt-4">
//                   <label className="flex items-center justify-center space-x-2">
//                     <Brush className="text-gray-600" />
//                     <span>Brush Size:</span>
//                     <input
//                       type="range"
//                       min="1"
//                       max="50"
//                       value={brushSize}
//                       onChange={handleBrushSizeChange}
//                       className="w-32"
//                     />
//                     <span>{brushSize}px</span>
//                   </label>
//                 </div>
//               )}
//               <button
//                 onClick={handleDownload}
//                 className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
//               >
//                 Download Image
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default BackgroundRemoverPage;


// with preview of brush
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Brush } from 'lucide-react';

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
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const brushPreviewRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (processedImage) {
      updateCanvas();
    }
  }, [processedImage, background, showBefore, customBackground]);

  useEffect(() => {
    updateBrushPreview();
  }, [brushSize]);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || (!processedImage && !imageSrc)) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = showBefore ? (imageSrc || '') : processedImage || '';
    img.onload = () => {
      const maxWidth = 300;
      const maxHeight = 300;
      const aspectRatio = img.width / img.height;
      
      let newWidth = maxWidth;
      let newHeight = maxWidth / aspectRatio;

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      }

      setCanvasSize({ width: newWidth, height: newHeight });

      canvas.width = newWidth;
      canvas.height = newHeight;

      if (!showBefore) {
        if (customBackground) {
          const bgImg = new window.Image();
          bgImg.crossOrigin = 'anonymous';
          bgImg.src = customBackground;
          bgImg.onload = () => {
            context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, newWidth, newHeight);
          };
        } else {
          const bgColor = getBackgroundColor(background);
          if (bgColor !== 'transparent') {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
          }
          context.drawImage(img, 0, 0, newWidth, newHeight);
        }
      } else {
        context.drawImage(img, 0, 0, newWidth, newHeight);
      }
    };
    img.onerror = () => setError('Failed to load image for processing.');
  };

  const updateBrushPreview = () => {
    const canvas = brushPreviewRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const size = Math.max(brushSize, 20);
    canvas.width = size;
    canvas.height = size;

    context.clearRect(0, 0, size, size);

    context.beginPath();
    context.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fill();

    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.stroke();
  };

  const getBackgroundColor = (bg: string): string => {
    switch (bg) {
      case 'bg-transparent': return 'transparent';
      case 'bg-white': return '#FFFFFF';
      case 'bg-black': return '#000000';
      case 'bg-gray-500': return '#6B7280';
      case 'bg-blue-500': return '#3B82F6';
      case 'bg-pink-500': return '#EC4899';
      case 'bg-yellow-500': return '#F59E0B';
      case 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500':
        return 'linear-gradient(to right, #D8B4FE, #EC4899, #EF4444)';
      default: return 'transparent';
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'processed_image.png';
    link.click();
  };

  const handleBrushSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushSize(Number(e.target.value));
  };

  const startErasing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsErasing(true);
    erase(e);
  };

  const stopErasing = () => {
    setIsErasing(false);
  };

  const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.globalCompositeOperation = 'destination-out';
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    contextRef.current.fill();
  };

  const handleCustomBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCustomBackground(URL.createObjectURL(event.target.files[0]));
    }
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
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
            </>
          )}
          {(image || imageSrc) && (
            <div className="mt-4">
              <Image
                src={imageSrc || URL.createObjectURL(image!)}
                alt="Uploaded Image"
                width={300}
                height={300}
                className="mb-4 rounded-lg object-contain"
              />
              <button
                onClick={handleImageUpload}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                {loading ? 'Processing...' : 'Remove Background'}
              </button>
            </div>
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
              <div className="mb-4">
                <label className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition duration-300">
                  Upload Custom Background
                  <input type="file" className="hidden" onChange={handleCustomBackgroundUpload} />
                </label>
              </div>
              <div className={`relative ${background} p-4 rounded-lg mx-auto flex justify-center items-center`} style={{ width: '300px', height: '300px' }}>
                <canvas
                  ref={canvasRef}
                  className="rounded-lg"
                  style={{
                    width: `${canvasSize.width}px`,
                    height: `${canvasSize.height}px`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  onMouseDown={startErasing}
                  onMouseMove={erase}
                  onMouseUp={stopErasing}
                  onMouseLeave={stopErasing}
                />
              </div>
              {!showBefore && (
                <div className="mt-4">
                  <label className="flex items-center justify-center space-x-2">
                    <Brush className="text-gray-600" />
                    <span>Brush Size:</span>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}
                      onChange={handleBrushSizeChange}
                      className="w-32"
                    />
                    <span>{brushSize}px</span>
                  </label>
                  <div className="mt-2 flex justify-center items-center">
                    <canvas
                      ref={brushPreviewRef}
                      className="border border-gray-300 rounded-full"
                      style={{
                        width: `${Math.max(brushSize, 20)}px`,
                        height: `${Math.max(brushSize, 20)}px`,
                      }}
                      style={{
                        width: `${Math.max(brushSize, 20)}px`,
                        height: `${Math.max(brushSize, 20)}px`,
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-600">Brush Preview</span>
                  </div>
                </div>
              )}
              <button
                onClick={handleDownload}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BackgroundRemoverPage;