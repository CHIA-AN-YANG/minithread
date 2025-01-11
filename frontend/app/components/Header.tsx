import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const Header: React.FC = () => {
  const [disableBack, setDisableBack] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (router.beforePopState.length === 0) {
      setDisableBack(true);
    } else {
      setDisableBack(false);
    }
  }, [router.pathname]);

  return (
    <div className="flex items-center justify-between px-2 border-b border-gray-300 shadow-sm">
      <button onClick={() => router.back()} className="mb-4 text-stone-500 hover:text-stone-600">
        <i className="lni lni-chevron-left lni-32"></i>
      </button>
      <div className="flex-1 text-center">
        <img src="/images/logos/minithread-md.png" alt="Logo" className="mb-4 h-10 inline-block" />
      </div>
      <div className="w-6"></div> {/* Placeholder for right alignment */}
    </div>
  );
};

export default Header;