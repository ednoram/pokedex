import { useEffect, useState } from "react";

const useDelay = (milliseconds = 1000): boolean => {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, milliseconds);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isWaiting;
};

export default useDelay;
