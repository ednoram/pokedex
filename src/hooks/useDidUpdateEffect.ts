import { useEffect, useState } from "react";

const useDidUpdateEffect = (func: () => unknown, dependencies: unknown[]) => {
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    if (didMount) {
      func();
    } else {
      setDidMount(true);
    }
  }, dependencies);
};

export default useDidUpdateEffect;
