import { useState, useEffect, useRef, useCallback } from 'react';
import { formatDurasi } from '../utils/formatters';

/**
 * Countdown timer hook for exam simulations
 * @param {Object} options
 * @param {number} options.initialSeconds - Initial countdown seconds
 * @param {Function} [options.onTimeout] - Called when timer reaches 0
 * @param {boolean} [options.autoStart=true]
 * @param {number} [options.warningThreshold=300] - Seconds threshold for warning (e.g. 5 mins)
 */
export function useTimer({
  initialSeconds = 2700, // 45 minutes
  onTimeout,
  autoStart = true,
  warningThreshold = 300,
} = {}) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (!isActive) return;

    if (secondsLeft <= 0) {
      setIsActive(false);
      if (onTimeoutRef.current) onTimeoutRef.current();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          if (onTimeoutRef.current) onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(
    (newSeconds = initialSeconds) => {
      setSecondsLeft(newSeconds);
      setIsActive(autoStart);
    },
    [initialSeconds, autoStart]
  );

  return {
    secondsLeft,
    formattedTime: formatDurasi(secondsLeft),
    isActive,
    isWarning: secondsLeft <= warningThreshold && secondsLeft > 0,
    start,
    pause,
    reset,
    setSecondsLeft,
  };
}

export default useTimer;
