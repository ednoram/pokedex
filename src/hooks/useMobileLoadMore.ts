import { useState, useEffect } from "react";

import { useWindowSize } from "hooks/index";
import { TABLET_SIZE, MOBILE_LOAD_MORE_DELAY } from "constants/index";

const useMobileLoadMore = ({
  limit,
  totalCount,
  extendLimit,
}: {
  limit: number;
  totalCount: number;
  extendLimit: () => void;
}): boolean => {
  const [, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      if (windowSize.height === null || windowSize.width === null) {
        return;
      }

      const totalHeight = Math.ceil(window.scrollY + windowSize.height);
      const shouldFunction = totalHeight >= document.body.scrollHeight;
      const isMobileOrTablet = windowSize.width <= TABLET_SIZE;

      if (shouldFunction) {
        if (limit < totalCount && isMobileOrTablet) {
          setLoading(true);
        }

        const increaseLimit = () => {
          if (!loading && isMobileOrTablet) {
            extendLimit();
          }

          setLoading(false);
        };

        const timeout = setTimeout(increaseLimit, MOBILE_LOAD_MORE_DELAY);

        setTimer(timeout);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setTimer(null);
    };
  }, [windowSize.width, windowSize.height, limit, extendLimit]);

  return loading;
};

export default useMobileLoadMore;
