'use client';

import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.screen.width);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLg = screenSize >= 1024;

  return { screenSize, isLg };
};
