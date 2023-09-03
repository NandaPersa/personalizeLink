import { useEffect, useState } from 'react';

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {screenSize, isMobile};
}

export default useScreenSize;