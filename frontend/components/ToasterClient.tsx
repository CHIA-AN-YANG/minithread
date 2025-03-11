'use client';

import { Toaster, ToastOptions } from 'react-hot-toast'; // or your toast library

const ToasterClient: React.FC<ToastOptions> = (options?: ToastOptions) => {
  return (
    <div>
      <Toaster
        toastOptions={options ? options : {}}
      />
    </div>
  );
}

export { ToasterClient };
