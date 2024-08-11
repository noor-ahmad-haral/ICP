import { useEffect, useState } from "react";

function useImage(file: File | null): [HTMLImageElement | null, boolean] {
  const isBrowser = typeof window !== "undefined";
  const [image, setImage] = useState<HTMLImageElement | null>(isBrowser ? new Image() : null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!file || !image) {
      return;
    }

    setIsLoaded(false);
    image.onload = () => {
      setIsLoaded(true);
    };

    image.src = URL.createObjectURL(file);

    return () => {
      if (image) {
        image.onload = null;
      }
    };
  }, [file, image]);

  return [image, isLoaded];
}

export { useImage };
