import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
<<<<<<< HEAD
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Otherwise, scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
=======
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes, unless there's a hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
>>>>>>> chris
