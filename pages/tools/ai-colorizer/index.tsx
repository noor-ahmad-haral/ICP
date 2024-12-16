import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { ClipLoader } from 'react-spinners';
import CompareImage from 'react-compare-image';

const AIColorizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSampleImage, setSelectedSampleImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const sampleImages = [
    { src: "/black-and-white/lake.webp", alt: "Car" },
    { src: "/black-and-white/flower.jpg", alt: "Coin" },
    { src: "/black-and-white/girl.jpg", alt: "Portrait 1" },
    { src: "/black-and-white/old-men.webp", alt: "Phone" }
  ];

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const newOriginalImageUrl = URL.createObjectURL(file);
      setOriginalImageUrl(newOriginalImageUrl);
      setImageUrl(null); // Clear previous imageUrl
      setSelectedSampleImage(null);
    }
  };

  const handleSampleClick = (src: string) => {
    setOriginalImageUrl(src);
    setSelectedSampleImage(src);
    setImageUrl(null); // Clear previous imageUrl
    setSelectedFile(null);
  };

  const handleStartAll = async () => {
    if (selectedFile || selectedSampleImage) {
      setProcessing(true);
      const formData = new FormData();

      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (selectedSampleImage) {
        try {
          const response = await fetch(selectedSampleImage);
          const blob = await response.blob();
          formData.append('file', blob, 'sample-image.png');
        } catch (error) {
          console.error('Error fetching sample image:', error);
          setProcessing(false);
          return;
        }
      }

      try {
        const response = await axios.post('http://localhost:8000/colorize/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        });

        const responseBlob = new Blob([response.data], { type: 'image/jpeg' });
        const newImageUrl = URL.createObjectURL(responseBlob);

        setImageUrl(newImageUrl);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setProcessing(false);
      }
    } else {
      console.error('No file or sample image selected.');
    }
  };

  const handleRemoveAll = () => {
    setSelectedFile(null);
    setOriginalImageUrl(null);
    setSelectedSampleImage(null);
    setImageUrl(null);
  };

  const handleDownload = () => {
    if (imageUrl) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'colorized_image.jpg';
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
          AI Colorizer
        </h1>
        <p className="mb-8 text-base font-light flex justify-center text-gray-500">
          Transform your black-and-white images into color using AI.
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
            {originalImageUrl && !imageUrl && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-center mb-4">Selected Image</h2>
                <Image src={originalImageUrl} alt="Selected Image" layout="responsive" width={800} height={600} />
              </div>
            )}
            {imageUrl && (
              <div className="mt-8 relative">
                <h2 className="text-lg font-semibold text-center mb-4">Before and After</h2>
                <div className="relative">
                  <CompareImage
                    leftImage={originalImageUrl!}
                    rightImage={imageUrl}
                    sliderLineColor="#000"
                    sliderHandleColor="#000"
                  />
                  <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black px-2 py-1 rounded">Before</span>
                  <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black px-2 py-1 rounded">After</span>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Render sample images only if no file or sample image is selected */}
          {!selectedFile && !selectedSampleImage && (
            <>
              <div className="mt-8 flex justify-center">
                <p>No picture on hand? Try with one of these:</p>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                {sampleImages.map((image) => (
                  <button
                    key={image.src}
                    onClick={() => handleSampleClick(image.src)}
                    className="relative transition-transform duration-300 ease-in-out transform hover:scale-105"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIColorizer;


// Always shows sample images

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Header from "@/components/Header";
// import Footer from "@/components/footer";
// import { ClipLoader } from 'react-spinners';
// import CompareImage from 'react-compare-image';

// const AIColorizer: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedSampleImage, setSelectedSampleImage] = useState<string | null>(null);
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

//   const sampleImages = [
//     { src: "/black-and-white/lake.webp", alt: "Car" },
//     { src: "/black-and-white/flower.jpg", alt: "Coin" },
//     { src: "/black-and-white/girl.jpg", alt: "Portrait 1" },
//     { src: "/black-and-white/old-men.webp", alt: "Phone" }
//   ];

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

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const newOriginalImageUrl = URL.createObjectURL(file);
//       setOriginalImageUrl(newOriginalImageUrl);
//       setImageUrl(null); // Clear previous imageUrl
//       setSelectedSampleImage(null);
//     }
//   };

//   const handleSampleClick = (src: string) => {
//     setOriginalImageUrl(src);
//     setSelectedSampleImage(src);
//     setImageUrl(null); // Clear previous imageUrl
//     setSelectedFile(null);
//   };

//   const handleStartAll = async () => {
//     if (selectedFile || selectedSampleImage) {
//       setProcessing(true);
//       const formData = new FormData();

//       if (selectedFile) {
//         formData.append('file', selectedFile);
//       } else if (selectedSampleImage) {
//         try {
//           const response = await fetch(selectedSampleImage);
//           const blob = await response.blob();
//           formData.append('file', blob, 'sample-image.png');
//         } catch (error) {
//           console.error('Error fetching sample image:', error);
//           setProcessing(false);
//           return;
//         }
//       }

//       try {
//         const response = await axios.post('http://localhost:8000/colorize/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           responseType: 'blob',
//         });

//         const responseBlob = new Blob([response.data], { type: 'image/jpeg' });
//         const newImageUrl = URL.createObjectURL(responseBlob);

//         setImageUrl(newImageUrl);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setProcessing(false);
//       }
//     } else {
//       console.error('No file or sample image selected.');
//     }
//   };

//   const handleRemoveAll = () => {
//     setSelectedFile(null);
//     setOriginalImageUrl(null);
//     setSelectedSampleImage(null);
//     setImageUrl(null);
//   };

//   const handleDownload = () => {
//     if (imageUrl) {
//       const a = document.createElement('a');
//       a.href = imageUrl;
//       a.download = 'colorized_image.jpg';
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
//           AI Colorizer
//         </h1>
//         <p className="mb-8 text-base font-light flex justify-center text-gray-500">
//           Transform your black-and-white images into color using AI.
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
//             <div className="flex justify-center space-x-4 mt-8">
//               <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleStartAll}>
//                 {processing ? (
//                   <>
//                     <ClipLoader size={20} color={"#fff"} />
//                     <span className="ml-2">Processing...</span>
//                   </>
//                 ) : (
//                   'Start All'
//                 )}
//               </button>
//               <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-rose-500 hover:bg-rose-600" onClick={handleRemoveAll}>
//                 Remove All
//               </button>
//             </div>
//             {originalImageUrl && !imageUrl && (
//               <div className="mt-8">
//                 <h2 className="text-lg font-semibold text-center mb-4">Selected Image</h2>
//                 <Image src={originalImageUrl} alt="Selected Image" layout="responsive" width={800} height={600} />
//               </div>
//             )}
//             {imageUrl && (
//               <div className="mt-8 relative">
//                 <h2 className="text-lg font-semibold text-center mb-4">Before and After</h2>
//                 <div className="relative">
//                   <CompareImage
//                     leftImage={originalImageUrl!}
//                     rightImage={imageUrl}
//                     sliderLineColor="#000"
//                     sliderHandleColor="#000"
//                   />
//                   <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black px-2 py-1 rounded">Before</span>
//                   <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black px-2 py-1 rounded">After</span>
//                 </div>
//                 <div className="flex justify-center mt-4">
//                   <button className="px-6 py-2 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600" onClick={handleDownload}>
//                     Download
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="mt-8 flex justify-center">
//             <p>No picture on hand? Try with one of these:</p>
//           </div>
//           <div className="mt-4 flex justify-center space-x-4">
//             {sampleImages.map((image) => (
//               <button
//                 key={image.src}
//                 onClick={() => handleSampleClick(image.src)}
//                 className="relative transition-transform duration-300 ease-in-out transform hover:scale-105"
//               >
//                 <Image
//                   src={image.src}
//                   alt={image.alt}
//                   width={80}
//                   height={80}
//                   className="rounded-lg"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AIColorizer;
