import { useEffect, useState, useRef } from 'react';

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const stickyAnchor = useRef(null);

  const handleScroll = () => {
    window.scrollY > stickyAnchor.current.getBoundingClientRect().bottom
      ? setSticky(true)
      : setSticky(false);
  };

  // This function handles the scroll performance issue
  const debounce = (func, wait = 20, immediate = true) => {
    let timeOut;
    return () => {
      let context = this;
      let args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 5));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  return { isSticky, stickyAnchor };
}

export default useSticky;
