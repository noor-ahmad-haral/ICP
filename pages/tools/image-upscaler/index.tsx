import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/footer";
// import ImageComparison from "@/components/ImageComparison";
import { ClipLoader } from 'react-spinners';

const SmartImageUpscaler: React.FC = () => {
  const [selectedUpscale, setSelectedUpscale] = useState<number>(2);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
    };
  }, [imageUrl, originalImageUrl]);

  const handleUpscaleChange = (value: number) => {
    setSelectedUpscale(value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const originalImageUrl = URL.createObjectURL(file);
      setOriginalImageUrl(originalImageUrl);
      console.log('File selected:', file.name);
    }
  };

  const handleStartAll = async () => {
    if (selectedFile) {
      setProcessing(true);

      const formData = new FormData();
      formData.append('scale', selectedUpscale.toString());
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:8000/upscale/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob'
        });

        const responseBlob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(responseBlob);

        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleRemoveAll = () => {
    setSelectedFile(null);
    setOriginalImageUrl(null);
    setImageUrl(null);
  };

  const handleDownload = () => {
    if (imageUrl) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'upscaled_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-md">
        <h1 className="mb-6 text-4xl font-bold flex justify-center tracking-tight leading-none text-gray-900 md:text-5xl">
          Smart Image Upscaler
        </h1>
        <p className="mb-8 text-base font-light flex justify-center text-gray-500">
          Upscale and enhance your JPG, PNG images in batch process.
        </p>
        <div className="w-full py-8">
          <div className="flex flex-col border border-dashed border-[#D9DBE0] rounded-xl bg-[#F7F9FC]">
            <div className="flex justify-center items-center h-[28vh] rounded-lg">
              <label htmlFor="file-upload" className="el-upload el-upload--text cursor-pointer">
                <div className="el-upload-dragger">
                  <Image
                    src="/uploadFile.svg"
                    alt="file uploader"
                    width={80}
                    height={80}
                    className="mb-4 mx-auto"
                  />
                  <p className="text-center text-black text-base font-medium">
                    Click or Drag & Drop Images
                  </p>
                  <p className="text-center text-black/60 text-sm font-light">
                    JPG or PNG. Max Size: 5MB or 1000px
                  </p>
                  {selectedFile && <p className="text-center text-black/60 text-sm font-light">Selected file: {selectedFile.name}</p>}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  name="file"
                  accept=".jpg,.jpeg,.png,.PNG,.JPG,.JPEG,.jfif"
                  className="el-upload__input hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <label className={`flex items-center ${selectedUpscale === 2 ? 'bg-indigo-500 text-white' : 'bg-transparent border border-gray-400'} rounded-lg px-3 py-1 cursor-pointer`}>
                <input
                  type="radio"
                  value={2}
                  checked={selectedUpscale === 2}
                  onChange={() => handleUpscaleChange(2)}
                  className="hidden"
                />
                200%
              </label>
              <label className={`flex items-center ${selectedUpscale === 4 ? 'bg-indigo-500 text-white' : 'bg-transparent border border-gray-400'} rounded-lg px-3 py-1 cursor-pointer`}>
                <input
                  type="radio"
                  value={4}
                  checked={selectedUpscale === 4}
                  onChange={() => handleUpscaleChange(4)}
                  className="hidden"
                />
                400%
              </label>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleStartAll}>
                {processing ? (
                  <>
                    <ClipLoader size={20} color={"#fff"} />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  'Start All'
                )}
              </button>
              <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-rose-500 hover:bg-rose-600" onClick={handleRemoveAll}>
                Remove All
              </button>
            </div>
            {originalImageUrl && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-center mb-4">Original Image</h2>
                <Image src={originalImageUrl} alt="Original Image" layout="responsive" width={800} height={600} />
              </div>
            )}
            {imageUrl && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-center mb-4">Upscaled Image</h2>
                <Image src={imageUrl} alt="Upscaled Image" layout="responsive" width={800} height={600} />
                <div className="flex justify-center mt-4">
                  <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SmartImageUpscaler;




// for 8x
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const SmartImageUpscaler: React.FC = () => {
//   const [selectedUpscale, setSelectedUpscale] = useState<number>(2);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     return () => {
//       if (imageUrl) {
//         URL.revokeObjectURL(imageUrl);
//       }
//       if (originalImageUrl) {
//         URL.revokeObjectURL(originalImageUrl);
//       }
//     };
//   }, [imageUrl, originalImageUrl]);

//   const handleUpscaleChange = (value: number) => {
//     setSelectedUpscale(value);
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const originalImageUrl = URL.createObjectURL(file);
//       setOriginalImageUrl(originalImageUrl);
//       console.log('File selected:', file.name);
//     }
//   };

//   const handleStartAll = async () => {
//     if (selectedFile) {
//       setProcessing(true);

//       const formData = new FormData();
//       formData.append('scale', selectedUpscale.toString());
//       formData.append('file', selectedFile);

//       try {
//         const response = await axios.post('http://localhost:8000/upscale/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//           responseType: 'blob'
//         });

//         const responseBlob = new Blob([response.data], { type: 'image/png' });
//         const imageUrl = URL.createObjectURL(responseBlob);

//         setImageUrl(imageUrl);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setProcessing(false);
//       }
//     }
//   };

//   const handleRemoveAll = () => {
//     setSelectedFile(null);
//     setOriginalImageUrl(null);
//     setImageUrl(null);
//   };

//   const handleDownload = () => {
//     if (imageUrl) {
//       const a = document.createElement('a');
//       a.href = imageUrl;
//       a.download = 'upscaled_image.png';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="mx-auto max-w-screen-md">
//         <h1 className="mb-6 text-4xl font-bold flex justify-center tracking-tight leading-none text-gray-900 md:text-5xl">
//           Smart Image Upscaler
//         </h1>
//         <p className="mb-8 text-base font-light flex justify-center text-gray-500">
//           Upscale and enhance your JPG, PNG images in batch process.
//         </p>
//         <div className="w-full py-8">
//           <div className="flex flex-col border border-dashed border-[#D9DBE0] rounded-xl bg-[#F7F9FC]">
//             <div className="flex justify-center items-center h-[28vh] rounded-lg">
//               <label htmlFor="file-upload" className="el-upload el-upload--text cursor-pointer">
//                 <div className="el-upload-dragger">
//                   <Image
//                     src="/uploadFile.svg"
//                     alt="file uploader"
//                     width={80}
//                     height={80}
//                     className="mb-4 mx-auto"
//                   />
//                   <p className="text-center text-black text-base font-medium">
//                     Click or Drag & Drop Images
//                   </p>
//                   <p className="text-center text-black/60 text-sm font-light">
//                     JPG or PNG. Max Size: 5MB or 1000px
//                   </p>
//                   {selectedFile && <p className="text-center text-black/60 text-sm font-light">Selected file: {selectedFile.name}</p>}
//                 </div>
//                 <input
//                   id="file-upload"
//                   type="file"
//                   name="file"
//                   accept=".jpg,.jpeg,.png,.PNG,.JPG,.JPEG,.jfif"
//                   className="el-upload__input hidden"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//             </div>
//             <div className="mt-6 flex justify-center space-x-4">
//               <label className={`flex items-center ${selectedUpscale === 2 ? 'bg-indigo-500 text-white' : 'bg-transparent border border-gray-400'} rounded-lg px-3 py-1 cursor-pointer`}>
//                 <input
//                   type="radio"
//                   value={2}
//                   checked={selectedUpscale === 2}
//                   onChange={() => handleUpscaleChange(2)}
//                   className="hidden"
//                 />
//                 200%
//               </label>
//               <label className={`flex items-center ${selectedUpscale === 4 ? 'bg-indigo-500 text-white' : 'bg-transparent border border-gray-400'} rounded-lg px-3 py-1 cursor-pointer`}>
//                 <input
//                   type="radio"
//                   value={4}
//                   checked={selectedUpscale === 4}
//                   onChange={() => handleUpscaleChange(4)}
//                   className="hidden"
//                 />
//                 400%
//               </label>
//               <label className={`flex items-center ${selectedUpscale === 8 ? 'bg-indigo-500 text-white' : 'bg-transparent border border-gray-400'} rounded-lg px-3 py-1 cursor-pointer`}>
//                 <input
//                   type="radio"
//                   value={8}
//                   checked={selectedUpscale === 8}
//                   onChange={() => handleUpscaleChange(8)}
//                   className="hidden"
//                 />
//                 800%
//               </label>
//             </div>
//             <div className="flex justify-center space-x-4 mt-8">
//               <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleStartAll}>
//                 {processing ? 'Processing...' : 'Start All'}
//               </button>
//               <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-rose-500 hover:bg-rose-600" onClick={handleRemoveAll}>
//                 Remove All
//               </button>
//             </div>
//             {originalImageUrl && (
//               <div className="mt-8">
//                 <h2 className="text-lg font-semibold text-center mb-4">Original Image</h2>
//                 <Image src={originalImageUrl} alt="Original Image" layout="responsive" width={800} height={600} />
//               </div>
//             )}
//             {imageUrl && (
//               <div className="mt-8">
//                 <h2 className="text-lg font-semibold text-center mb-4">Upscaled Image</h2>
//                 <Image src={imageUrl} alt="Upscaled Image" layout="responsive" width={800} height={600} />
//                 <div className="flex justify-center mt-4">
//                   <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleDownload}>
//                     Download
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SmartImageUpscaler;