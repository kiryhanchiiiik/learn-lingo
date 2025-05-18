import { useEffect, useState } from "react";

export function useDelayedLoader(isLoading: boolean, delay = 500): boolean {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, delay]);

  return showLoader;
}
