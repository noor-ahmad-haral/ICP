// User can select the number of images to generate
// import React, { useState } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import FAQ from '@/components/Faq';
// import { ClipLoader } from 'react-spinners';
// import { Notifications, showNotification } from '@/components/Notification';

// const PRESET_PROMPTS = [
//   'A serene landscape with mountains and a lake at sunset.',
//   'A futuristic cityscape with flying cars and neon lights.',
//   'A cozy cabin in the woods during winter with snowfall.',
// ];

// const ASPECT_RATIOS = [
//   { label: 'Square (1:1)', value: '1:1' },
//   { label: 'Landscape (16:9)', value: '16:9' },
//   { label: 'Portrait (9:16)', value: '9:16' },
//   { label: 'Classic (4:3)', value: '4:3' },
//   { label: 'Tall (3:4)', value: '3:4' },
// ];

// const TextToImage: React.FC = () => {
//   const [prompt, setPrompt] = useState<string>('');
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const [aspectRatio, setAspectRatio] = useState<string>('1:1');
//   const [numImages, setNumImages] = useState<number>(1); // State to manage number of images

//   const handleGenerateImage = async () => {
//     if (!prompt.trim()) {
//       showNotification.error('Please enter a valid prompt.');
//       return;
//     }

//     setProcessing(true);
//     setGeneratedImages([]);

//     try {
//       const response = await axios.post(
//         `https://engine.prod.bria-api.com/v1/text-to-image/base/2.3`,
//         {
//           prompt: prompt.trim(),
//           num_results: numImages, // Pass selected number of images
//           sync: true,
//           aspect_ratio: aspectRatio,
//           steps_num: 30,
//           text_guidance_scale: 7,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             api_token: 'acb0ecf68ea94050902b9a249c032e3d', // Replace with your API token
//           },
//         }
//       );

//       if (response.data?.result && response.data.result.length > 0) {
//         const generatedUrls = response.data.result.map((res: any) => res.urls[0]);
//         setGeneratedImages(generatedUrls);
//         showNotification.success('Images generated successfully!');
//       } else {
//         showNotification.error('Failed to retrieve the generated images.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       showNotification.error('Error generating the images.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleDownload = (url: string, index: number) => {
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `generated_image_${index + 1}.png`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     showNotification.success(`Image ${index + 1} downloaded successfully!`);
//   };

//   const applyPresetPrompt = (preset: string) => {
//     setPrompt(preset);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="mx-auto max-w-screen-md px-4">
//         <h1 className="mb-6 text-4xl font-bold text-center tracking-tight text-gray-900 md:text-5xl">
//           Text to Image Generator
//         </h1>
//         <p className="mb-8 text-center text-gray-500 text-lg">
//           Create stunning images from your text prompts with AI.
//         </p>
//         <div className="w-full py-8">
//           <div className="flex flex-col border border-dashed border-gray-300 rounded-xl bg-gray-50 p-8">
//             <textarea
//               className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               rows={4}
//               placeholder="Enter your prompt here..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             />
//             <div className="mt-4">
//               <p className="mb-2 text-gray-600">Choose a template prompt:</p>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {PRESET_PROMPTS.map((preset, index) => (
//                   <button
//                     key={index}
//                     className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
//                     onClick={() => applyPresetPrompt(preset)}
//                   >
//                     {preset}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-gray-600">Select Aspect Ratio:</label>
//               <select
//                 className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={aspectRatio}
//                 onChange={(e) => setAspectRatio(e.target.value)}
//               >
//                 {ASPECT_RATIOS.map((ratio, index) => (
//                   <option key={index} value={ratio.value}>
//                     {ratio.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-gray-600">Number of Images:</label>
//               <select
//                 className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={numImages}
//                 onChange={(e) => setNumImages(Number(e.target.value))}
//               >
//                 {[1, 2, 4].map((count) => (
//                   <option key={count} value={count}>
//                     {count} Image{count > 1 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-center space-x-4 mt-8">
//               <button
//                 className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600"
//                 onClick={handleGenerateImage}
//                 disabled={processing}
//               >
//                 {processing ? (
//                   <>
//                     <ClipLoader size={20} color="#fff" />
//                     <span className="ml-2">Processing...</span>
//                   </>
//                 ) : (
//                   'Generate Image'
//                 )}
//               </button>
//             </div>
//           </div>

//           {generatedImages.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-lg font-semibold text-center mb-4">Generated Images</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {generatedImages.map((url, index) => (
//                   <div key={index} className="relative flex flex-col items-center">
//                     <Image
//                       src={url}
//                       alt={`Generated Image ${index + 1}`}
//                       width={256}
//                       height={256}
//                       className="rounded-lg shadow-lg"
//                     />
//                     <button
//                       className="mt-4 px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600"
//                       onClick={() => handleDownload(url, index)}
//                     >
//                       Download
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Integrating the FAQ component */}
//         <div className="mt-12">
//           <FAQ />
//         </div>
//       </div>
//       <Footer />
//       <Notifications />
//     </div>
//   );
// };

// export default TextToImage;






// Without Numver of images selection
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import { ClipLoader } from 'react-spinners';
import { Notifications, showNotification } from '@/components/Notification';

const PRESET_PROMPTS = [
  'A serene landscape with mountains and a lake at sunset.',
  'A futuristic cityscape with flying cars and neon lights.',
  'A cozy cabin in the woods during winter with snowfall.',
];

const ASPECT_RATIOS = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Landscape (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Classic (4:3)', value: '4:3' },
  { label: 'Tall (3:4)', value: '3:4' },
];

const TextToImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      showNotification.error('Please enter a valid prompt.');
      return;
    }

    setProcessing(true);
    setImageUrls([]);

    try {
      const response = await axios.post(
        `https://engine.prod.bria-api.com/v1/text-to-image/base/2.3`,
        {
          prompt: prompt.trim(),
          num_results: 4,
          sync: true,
          aspect_ratio: aspectRatio,
          steps_num: 30,
          text_guidance_scale: 7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            api_token: 'acb0ecf68ea94050902b9a249c032e3d', // Replace with your API token
          },
        }
      );

      if (response.data?.result && response.data.result.length > 0) {
        const generatedUrls = response.data.result.map((item: any) => item.urls[0]);
        if (generatedUrls.length > 0) {
          setImageUrls(generatedUrls);
          showNotification.success('Images generated successfully!');
        } else {
          showNotification.error('Failed to retrieve the generated images.');
        }
      } else {
        showNotification.error('Unexpected response format from the API.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification.error('Error generating the images.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification.success('Image downloaded successfully!');
  };

  const applyPresetPrompt = (preset: string) => {
    setPrompt(preset);
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-md px-4">
        <h1 className="mb-6 text-4xl font-bold text-center tracking-tight text-gray-900 md:text-5xl">
          Text to Image Generator
        </h1>
        <p className="mb-8 text-center text-gray-500 text-lg">
          Create stunning images from your text prompts with AI.
        </p>
        <div className="w-full py-8">
          <div className="flex flex-col border border-dashed border-gray-300 rounded-xl bg-gray-50 p-8">
            <textarea
              className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mt-4">
              <p className="mb-2 text-gray-600">Choose a template prompt:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRESET_PROMPTS.map((preset, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                    onClick={() => applyPresetPrompt(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-gray-600">Select Aspect Ratio:</label>
              <select
                className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              >
                {ASPECT_RATIOS.map((ratio, index) => (
                  <option key={index} value={ratio.value}>
                    {ratio.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <button
                className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600"
                onClick={handleGenerateImage}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <ClipLoader size={20} color="#fff" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  'Generate Images'
                )}
              </button>
            </div>
          </div>

          {imageUrls.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-center mb-4">Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={url}
                      alt={`Generated Image ${index + 1}`}
                      width={512}
                      height={512}
                      className="rounded-lg shadow-lg"
                    />
                    <button
                      className="absolute top-2 right-2 px-3 py-1 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded"
                      onClick={() => handleDownload(url)}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Integrating the FAQ component */}
        <div className="mt-12">
          <FAQ />
        </div>
      </div>
      <Footer />
      <Notifications />
    </div>
  );
};

export default TextToImage;



// Without aspect ratio
// import React, { useState } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import FAQ from '@/components/Faq';
// import { ClipLoader } from 'react-spinners';
// import { Notifications, showNotification } from '@/components/Notification';

// const PRESET_PROMPTS = [
//   'A serene landscape with mountains and a lake at sunset.',
//   'A futuristic cityscape with flying cars and neon lights.',
//   'A cozy cabin in the woods during winter with snowfall.',
  
// ];

// const TextToImage: React.FC = () => {
//   const [prompt, setPrompt] = useState<string>('');
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleGenerateImage = async () => {
//     if (!prompt.trim()) {
//       showNotification.error('Please enter a valid prompt.');
//       return;
//     }

//     setProcessing(true);
//     setImageUrl(null);

//     try {
//       const response = await axios.post(
//         `https://engine.prod.bria-api.com/v1/text-to-image/base/2.3`,
//         {
//           prompt: prompt.trim(),
//           num_results: 4,
//           sync: true,
//           aspect_ratio: '1:1',
//           steps_num: 30,
//           text_guidance_scale: 7,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             api_token: 'acb0ecf68ea94050902b9a249c032e3d', // Replace with your API token
//           },
//         }
//       );

//       if (response.data?.result && response.data.result.length > 0) {
//         const generatedImageUrl = response.data.result[0]?.urls[0] || null;
//         if (generatedImageUrl) {
//           setImageUrl(generatedImageUrl);
//           showNotification.success('Image generated successfully!');
//         } else {
//           showNotification.error('Failed to retrieve the generated image.');
//         }
//       } else {
//         showNotification.error('Unexpected response format from the API.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       showNotification.error('Error generating the image.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleDownload = () => {
//     if (imageUrl) {
//       const a = document.createElement('a');
//       a.href = imageUrl;
//       a.download = 'generated_image.png';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       showNotification.success('Image downloaded successfully!');
//     } else {
//       showNotification.error('No image to download.');
//     }
//   };

//   const applyPresetPrompt = (preset: string) => {
//     setPrompt(preset);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="mx-auto max-w-screen-md px-4">
//         <h1 className="mb-6 text-4xl font-bold text-center tracking-tight text-gray-900 md:text-5xl">
//           Text to Image Generator
//         </h1>
//         <p className="mb-8 text-center text-gray-500 text-lg">
//           Create stunning images from your text prompts with AI.
//         </p>
//         <div className="w-full py-8">
//           <div className="flex flex-col border border-dashed border-gray-300 rounded-xl bg-gray-50 p-8">
//             <textarea
//               className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               rows={4}
//               placeholder="Enter your prompt here..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             />
//             <div className="mt-4">
//               <p className="mb-2 text-gray-600">Choose a template prompt:</p>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {PRESET_PROMPTS.map((preset, index) => (
//                   <button
//                     key={index}
//                     className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
//                     onClick={() => applyPresetPrompt(preset)}
//                   >
//                     {preset}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center space-x-4 mt-8">
//               <button
//                 className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600"
//                 onClick={handleGenerateImage}
//                 disabled={processing}
//               >
//                 {processing ? (
//                   <>
//                     <ClipLoader size={20} color="#fff" />
//                     <span className="ml-2">Processing...</span>
//                   </>
//                 ) : (
//                   'Generate Image'
//                 )}
//               </button>
//             </div>
//           </div>

//           {imageUrl && (
//             <div className="mt-8">
//               <h2 className="text-lg font-semibold text-center mb-4">Generated Image</h2>
//               <div className="relative flex justify-center">
//                 <Image
//                   src={imageUrl}
//                   alt="Generated Image"
//                   width={512}
//                   height={512}
//                   className="rounded-lg shadow-lg"
//                 />
//               </div>
//               <div className="flex justify-center mt-4">
//                 <button
//                   className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600"
//                   onClick={handleDownload}
//                 >
//                   Download
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Integrating the FAQ component */}
//         <div className="mt-12">
//           <FAQ />
//         </div>
//       </div>
//       <Footer />
//       <Notifications />
//     </div>
//   );
// };

// export default TextToImage;
