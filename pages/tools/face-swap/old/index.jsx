import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Notifications, showNotification } from '@/components/Notification';
import { Upload, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const sampleSourceImages = [
  '/face-swap/face swap images1.webp',
  '/face-swap/face swap images2.webp',
  '/face-swap/face swap images3.webp',
];
const sampleTargetImages = [
  '/face-swap/face swap images8.webp',
  '/face-swap/face swap images5.webp',
  '/face-swap/face swap images6.webp',
];

const FaceSwapTool = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [swappedImageUrl, setSwappedImageUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [selectedSourceImage, setSelectedSourceImage] = useState(null);
  const [selectedTargetImage, setSelectedTargetImage] = useState(null);

  const handleFileChange = (e, setImage, setSelectedImage) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSampleSelect = (url, setImage, setSelectedImage) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'sample.jpg', { type: blob.type });
        setImage(file);
        setSelectedImage(url);
      })
      .catch((error) => {
        console.error('Error loading sample image:', error);
      });
  };

  const handleSwapFaces = async () => {
    if (!sourceImage || !targetImage) {
      showNotification.error('Please upload or select both source and target images.');
      return;
    }

    setProcessing(true);
    setSwappedImageUrl(null);

    const formData = new FormData();
    formData.append('target_image', targetImage); // Corrected to 'target_image'
    formData.append('swap_image', sourceImage); // Corrected to 'swap_image'

    try {
      const response = await axios.post(
        'https://developer.remaker.ai/api/remaker/v1/face-swap/create-job', // Use the correct API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzMDA1ODUsInByb2R1Y3RfY29kZSI6IjA2NzAwMyIsInRpbWUiOjE3MzM2NTI3NjZ9.nLa1CmPtLww4PM7Gkjc6RXFGSs-NY8lQ5BbApfKzdj8', // Replace with your API key
          },
        }
      );

      if (response.data?.result?.job_id) {
        const jobId = response.data.result.job_id; // Extract the job_id
        showNotification.success(
          <>
            <CheckCircle size={16} /> Face swap job created successfully! Fetching the result...
          </>
        );

        // Fetch the job result after a delay
        setTimeout(async () => {
          const fetchResponse = await axios.get(
            `https://developer.remaker.ai/api/remaker/v1/face-swap/${jobId}`,
            {
              headers: {
                'accept': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzMDA1ODUsInByb2R1Y3RfY29kZSI6IjA2NzAwMyIsInRpbWUiOjE3MzM2NTI3NjZ9.nLa1CmPtLww4PM7Gkjc6RXFGSs-NY8lQ5BbApfKzdj8', // Replace with your API key
              },
            }
          );

          if (fetchResponse.data?.result?.output_image_url) {
            setSwappedImageUrl(fetchResponse.data.result.output_image_url[0]); // Get the first output image URL
            showNotification.success(
              <>
                <CheckCircle size={16} /> Face swapped successfully!
              </>
            );
          } else {
            showNotification.error(
              <>
                <AlertCircle size={16} /> Failed to fetch the swapped image. Try again later.
              </>
            );
          }
        }, 5000); // Adjust the delay as needed
      } else {
        showNotification.error(
          <>
            <AlertCircle size={16} /> Failed to create face swap job. Try again later.
          </>
        );
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification.error(
        <>
          <AlertCircle size={16} /> Error swapping faces.
        </>
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-lg px-4">
        <h1 className="mb-6 text-4xl font-bold text-center tracking-tight text-gray-900 md:text-5xl">
          AI Face Swap Tool
        </h1>
        <p className="mb-8 text-center text-gray-500 text-lg">
          Select or upload source and target images to swap faces using AI.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Source Image Section */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upload Original Image</h2>
            <div
              className={`border-dashed border-2 rounded-lg p-4 text-center ${
                !selectedSourceImage ? 'border-gray-300' : 'border-green-400'
              }`}
            >
              {!selectedSourceImage ? (
                <>
                  <Upload size={32} className="mx-auto mb-2 text-gray-500" />
                  <label htmlFor="source-upload" className="cursor-pointer text-indigo-500 hover:underline">
                    Upload image
                  </label>
                  <input
                    id="source-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setSourceImage, setSelectedSourceImage)}
                  />
                </>
              ) : (
                <div className="mb-4 w-40 h-40 mx-auto border rounded-lg overflow-hidden">
                  <Image
                    src={selectedSourceImage}
                    alt="Source Preview"
                    width={400}
                    height={400}
                  />
                </div>
              )}
            </div>
            <h3 className="text-sm text-gray-500 mt-4">Try these images</h3>
            <div className="flex space-x-2">
              {sampleSourceImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Sample Source"
                  className="w-16 h-16 rounded-lg cursor-pointer border border-gray-300"
                  onClick={() => handleSampleSelect(url, setSourceImage, setSelectedSourceImage)}
                />
              ))}
            </div>
          </div>

          {/* Target Image Section */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upload Target Face</h2>
            <div
              className={`border-dashed border-2 rounded-lg p-4 text-center ${
                !selectedTargetImage ? 'border-gray-300' : 'border-green-400'
              }`}
            >
              {!selectedTargetImage ? (
                <>
                  <Upload size={32} className="mx-auto mb-2 text-gray-500" />
                  <label htmlFor="target-upload" className="cursor-pointer text-indigo-500 hover:underline">
                    Upload swap image
                  </label>
                  <input
                    id="target-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setTargetImage, setSelectedTargetImage)}
                  />
                </>
              ) : (
                <div className="mb-4 w-40 h-40 mx-auto border rounded-lg overflow-hidden">
                  <Image
                    src={selectedTargetImage}
                    alt="Target Preview"
                    width={400}
                    height={400}
                  />
                </div>
              )}
            </div>
            <h3 className="text-sm text-gray-500 mt-4">Try these images</h3>
            <div className="flex space-x-2">
              {sampleTargetImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Sample Target"
                  className="w-16 h-16 rounded-lg cursor-pointer border border-gray-300"
                  onClick={() => handleSampleSelect(url, setTargetImage, setSelectedTargetImage)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 p-2">
          <button
            className="px-8 py-3 font-bold rounded-full text-white text-base bg-indigo-500 hover:bg-indigo-600 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={handleSwapFaces}
            disabled={processing || !sourceImage || !targetImage}
          >
            {processing ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'Swap Faces'
            )}
          </button>
        </div>

        {swappedImageUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Swapped Image</h2>
            <div className="w-80 h-80 mx-auto border rounded-lg overflow-hidden">
              <Image
                src={swappedImageUrl}
                alt="Swapped Preview"
                width={400}
                height={400}
              />
            </div>
          </div>
        )}
      </div>
      <Notifications />
      <Footer />
    </div>
  );
};

export default FaceSwapTool;