"use client"
import Link from 'next/link';
import { startInput } from '../../store/features/user/actions/threadActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { selectStatus } from '@/app/store/features/user/selectors/authSelectors';
import { EntityStatus } from '@/app/model/model';
import UserCheckedIcon from '../icon/UserCheckedIcon';
import { useRouter } from 'next/router';

const BottomNavbar: React.FC = () => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const startNewThread = () => {
    if (!authorizedUser()) {
      router.push('/login');
    }
    dispatch(startInput());
  }
  const authorizedUser = () => {
    return status === EntityStatus.SUCCESS;
  }

  return (
    <div className="h-15 p-2 border-t-2 border-gray-300 flex justify-around items-center">
      <Link href="/" className="flex flex-col items-center" aria-label="Home">
        <i className="lni lni-home-2 lni-32 text-slate-700 hover:text-blue-50"></i>
      </Link>
      {authorizedUser() ?
        <Link href="/me/threads" className="flex flex-col items-center text-slate-700 hover:text-blue-500" aria-label="Profile">
          <UserCheckedIcon className="h-9 w-9 mt-1"></UserCheckedIcon>
        </Link>
        :
        <Link href="/login" className="flex flex-col items-center" aria-label="Login">
          <i className="lni lni-user-4 lni-32 text-slate-700 hover:text-blue-500"></i>
        </Link>
      }
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