import React from 'react';
// import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  before: { imageUrl: string };
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImage, afterImage }) => {
  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Before and After Comparison</h2>
      {/* <BeforeAfterSlider
        before={{ imageUrl: beforeImage }}
        after={{ imageUrl: afterImage }}
        width={800}
        height={600}
        className="rounded-lg shadow-lg overflow-hidden"
      /> */}
    </div>
  );
};

// export default ImageComparison;
