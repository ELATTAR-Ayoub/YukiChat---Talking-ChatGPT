import React, { useState, useEffect } from 'react'

// styles
import styles from '@/styles/index';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'alert';
  duration?: number;
}

const ToastMessage: React.FC<ToastProps> = ({ message, type, duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timeoutId = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  return  (
    <>
        {show && <div className={` ${type == 'error' ?
            ' bg-danger-color' : 
            'bg-success-color'
            } 
                fixed top-5 right-0 rounded ${styles.flexCenter} text-primary-grey px-8 p-4 shadow text-sm lg:text-base z-50
            `} >
            <p>{message}</p>
        </div>}
    </>
  );
};

export default ToastMessage;
