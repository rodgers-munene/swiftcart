import { div } from 'framer-motion/client';
import { useEffect, useState } from 'react';

const Notification = ({ message, duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let intervalId;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(intervalId);
        onClose(); // remove the notification
      }
    };

    intervalId = setInterval(tick, 50); // update every 50ms

    return () => clearInterval(intervalId);
  }, [duration, onClose]);

  return (
    <div className='w-full'>
        <div className="fixed top-0 left-0 sm:left-1/3 w-1/3 p-4 bg-white shadow-md rounded border border-green-500 text-green-800">
            <p>{message}</p>
            <div className="absolute bottom-0 left-0 h-1 bg-green-500" style={{ width: `${progress}%` }} />
        </div>
    </div>
  );
};

export default Notification
