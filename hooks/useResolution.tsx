import { useCallback, useEffect, useState } from 'react';

const useResolution = () => {
  const [width, setWidth] = useState<number | null>(null);

  const windowSizeHandler = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Check if the window object is available (i.e., running on the client side)
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);

      window.addEventListener('resize', windowSizeHandler);

      return () => {
        window.removeEventListener('resize', windowSizeHandler);
      };
    }
  }, [windowSizeHandler]);

  // Return the resolution type based on the width
  if (width === null) {
    return 'loading'; // Return a default state or null while the width is being determined
  } else if (width < 768) {
    return 'mobile';
  } else if (width >= 768 && width < 1224) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export default useResolution;
