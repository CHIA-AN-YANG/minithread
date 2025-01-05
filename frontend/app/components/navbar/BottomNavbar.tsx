"use client"
import Link from 'next/link';
import { startInput } from '../../store/features/user/actions/threadActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { selectInputFormOpen, selectParent } from '../../store/features/user/selectors/uiSelectors';

const BottomNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const startNewThread = () => {
    dispatch(startInput());
  }

  return (
    <div className="h-15 p-2 border-t-2 border-gray-300 flex justify-around items-center">
      <Link href="/latest" className="flex flex-col items-center" aria-label="Home">
        <i className="lni lni-home-2 lni-32 text-slate-700 hover:text-blue-50"></i>
      </Link>
      <Link href="/profile" className="flex flex-col items-center" aria-label="Profile">
        <i className="lni lni-user-4 lni-32 text-slate-700 hover:text-blue-500"></i>
      </Link>
      <Link href="/notifications" className="flex flex-col items-center" aria-label="Notifications">
        <i className="lni lni-bell-1 lni-32 text-slate-700 hover:text-blue-500"></i>
      </Link>
      <button onClick={startNewThread} className="flex flex-col items-center" aria-label="New Message">
        <i className="lni lni-message-3-text lni-32 text-slate-700 hover:text-blue-500"></i>
      </button>
    </div>
  );
};

export default BottomNavbar;