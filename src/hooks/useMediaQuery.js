import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches
 * @param {string} query - CSS media query e.g. '(max-width: 768px)'
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Initial check
    listener();

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export default useMediaQuery;
