import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Download } from 'lucide-react';
import Layout from "/layouts/default";
import HamaTips from "@/components/HamaTips";

interface ObjectRemoverProps {
  initialBrushSize?: number;
  sampleImages?: string[];
}

type ViewMode = 'before' | 'after';

const ObjectRemover: React.FC<ObjectRemoverProps> = ({
  initialBrushSize = 10,
  sampleImages = [
    '/obj-remover/obj (1).jpg',
    '/obj-remover/obj (1).png',
    '/obj-remover/obj (2).jpg',
    '/obj-remover/obj (2).png',
    '/obj-remover/obj (3).jpg',
  ]
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState<number>(initialBrushSize);
  const [beforeAfter, setBeforeAfter] = useState<ViewMode>('before');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const maskCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // New refs for smooth drawing
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const initializeCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const scale = Math.min(
      rect.width / image.width,
      rect.height / image.height
    );
    
    const centerShiftX = (rect.width - image.width * scale) / 2;
    const centerShiftY = (rect.height - image.height * scale) / 2;

    return { scale, centerShiftX, centerShiftY };
  };

  useEffect(() => {
    if (!selectedImage || !canvasRef.current || !maskCanvasRef.current) return;

    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');
    
    if (!ctx || !maskCtx) return;
    
    ctxRef.current = ctx;
    maskCtxRef.current = maskCtx;

    const image = new Image();
    image.src = selectedImage;
    
    const handleImageLoad = () => {
      if (!canvas || !ctx || !maskCanvas || !maskCtx) return;

      const { scale, centerShiftX, centerShiftY } = initializeCanvas(canvas, ctx, image);
      initializeCanvas(maskCanvas, maskCtx, image);

      // Draw image on main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        centerShiftX, centerShiftY,
        image.width * scale,
        image.height * scale
      );

      // Clear mask canvas
      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      
      imageRef.current = image;
    };

    image.onload = handleImageLoad;

    return () => {
      image.onload = null;
    };
  }, [selectedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const getMousePos = (event: MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!maskCanvasRef.current || !maskCtxRef.current) return;

    const { x, y } = getMousePos(event.nativeEvent, maskCanvasRef.current);
    
    const ctx = maskCtxRef.current;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Reset last position
    lastPosRef.current = { x, y };
    
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !maskCanvasRef.current || !maskCtxRef.current) return;

    const { x, y } = getMousePos(event.nativeEvent, maskCanvasRef.current);
    
    const ctx = maskCtxRef.current;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';  // Add smooth line joining
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';

    // Smooth out drawing with quadratic curve interpolation
    if (lastPosRef.current) {
      const { x: lastX, y: lastY } = lastPosRef.current;
      
      // Control point for quadratic curve (midpoint)
      const cpx = (lastX + x) / 2;
      const cpy = (lastY + y) / 2;

      ctx.quadraticCurveTo(cpx, cpy, x, y);
      ctx.stroke();
      
      // Move to the current point
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    // Update last position
    lastPosRef.current = { x, y };
  };

  const finishDrawing = () => {
    if (!maskCtxRef.current) return;
    
    maskCtxRef.current.closePath();
    lastPosRef.current = null;  // Reset last position
    setIsDrawing(false);
  };

  const processImage = async () => {
    if (!canvasRef.current || !maskCanvasRef.current) return;
  
    setIsProcessing(true);
  
    try {
      const imageBlob = await new Promise<Blob>((resolve) =>
        canvasRef.current!.toBlob((blob) => resolve(blob!), "image/jpeg")
      );
  
      const maskBlob = await new Promise<Blob>((resolve) =>
        maskCanvasRef.current!.toBlob((blob) => resolve(blob!), "image/png")
      );
  
      const formData = new FormData();
      formData.append("image", imageBlob, "image.jpg");
      formData.append("mask", maskBlob, "mask.png");
  
      const response = await fetch("http://localhost:8000/inpaint/", {
        method: "POST",
        body: formData,
      });
  
      console.log("API Response Status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const resultBlob = await response.blob();
      const reader = new FileReader();
  
      reader.onloadend = () => {
  const dataURL = reader.result as string;
  setProcessedImage(dataURL);
  setBeforeAfter("after");
};

  
      reader.readAsDataURL(resultBlob);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage && !canvasRef.current) {
      alert("No image available to download.");
      return;
    }
  
    const imageToDownload = processedImage || canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = imageToDownload;
    document.body.appendChild(link); // Append to body to ensure it works in some browsers
    link.click();
    document.body.removeChild(link); // Clean up
  };
  
  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
            <Upload className="mr-2" /> Remove unwanted objects from your photos with AI
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Paint over the objects you want to remove and let AI do the magic.
          </p>
        </div>

        {!selectedImage ? (
          <div
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors mb-2"
            >
              + Select a picture
            </button>
            <p className="text-gray-500 mb-4">Or drop an image</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <div>
              <p className="text-gray-600 mb-2">No picture on hand? Try one of these:</p>
              <div className="flex justify-center space-x-2">
                {sampleImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Sample ${index + 1}`}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(src)}
                  />
                ))}
              </div>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <HamaTips />
            </div>
          </div>
          
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-700">
                  Brush Size
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
              <div className="flex space-x-2">
                {(['before', 'after'] as const).map((mode) => (
                  <button
                    key={mode}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      beforeAfter === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setBeforeAfter(mode)}
                    disabled={mode === 'after' && !processedImage}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="relative bg-gray-200 rounded-lg overflow-hidden"
              style={{ height: '60vh' }}
            >
              {beforeAfter === 'before' ? (
                <>
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                  <canvas
                    ref={maskCanvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    className="absolute top-0 left-0 w-full h-full object-contain cursor-crosshair"
                  />
                </>
              ) : (
                <img 
                  src={processedImage!} 
                  alt="Processed" 
                  className="w-full h-full object-contain"
                />
              )}
              <button
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                onClick={() => {
                  setSelectedImage(null);
                  setProcessedImage(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                onClick={processImage}
                disabled={isProcessing || !selectedImage}
              >
                {isProcessing ? 'Processing...' : 'Remove Objects'}
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                onClick={downloadImage}
                disabled={isProcessing}
              >
                <Download className="mr-2" /> Download
              </button>
            </div>
            
          </div>
          
        )}
      </div>
    </Layout>
  );
};

export default ObjectRemover;


