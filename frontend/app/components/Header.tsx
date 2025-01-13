import { useRouter } from 'next/router';
import React from 'react';

type HeaderProps = {
  style?: string;
};


const Header: React.FC<HeaderProps> = ({ style }) => {
  const [disableBack, setDisableBack] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (router.beforePopState.length === 0) {
      setDisableBack(true);
    } else {
      setDisableBack(false);
    }
  }, [router.pathname]);

  const getClassName = (): string => {
    switch (style) {
      case 'form':
        return 'invert';
      case 'no-border':
        return '';
      default:
        return 'border-b border-gray-300';
    }
  };

  return (
    <div className={`flex items-center justify-between px-2 ${getClassName()}`}>
      <button onClick={() => router.back()} className="mb-4 text-stone-700 hover:text-slate-100">
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