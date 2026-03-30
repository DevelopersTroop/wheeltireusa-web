import { useEffect, useState } from "react";

export default function useScrollVisibility(sentinelRef: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [sentinelRef]);

  return isVisible;
}
