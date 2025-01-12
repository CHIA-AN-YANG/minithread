"use client"
import Link from 'next/link';
import { startInput } from '../../store/features/user/actions/threadActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { selectStatus, selectUser } from '@/app/store/features/user/selectors/authSelectors';
import { EntityStatus } from '@/app/model/model';
import UserCheckedIcon from '../icon/UserCheckedIcon';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';

const BottomNavbar: React.FC = () => {
  const user = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => { setLoggedIn(Boolean(user?.username)); }, [user]);

  const startNewThread = () => {
    if (!authorizedUser()) {
      router.push('/login');
    }
    dispatch(startInput());
  }
  const authorizedUser = () => {
    return Boolean(user?.username);
  }

  if (!isClient) return null;

  return (
    <div className="h-15 p-2 border-t border-gray-300 flex justify-around items-center text-stone-500 hover:text-blue-500">
      <Link href="/" className="flex flex-col items-center" aria-label="Home">
        <i className="lni lni-home-2 lni-32"></i>
      </Link>
      {loggedIn ?
        <Link href="/me/threads" className="flex flex-col items-center" aria-label="Profile">
          <UserCheckedIcon className="h-9 w-9 mt-1"></UserCheckedIcon>
        </Link>
        :
        <Link href="/login" className="flex flex-col items-center" aria-label="Login">
          <i className="lni lni-user-4 lni-32"></i>
        </Link>
      }
      <Link href="/notifications" className="flex flex-col items-center" aria-label="Notifications">
        <i className="lni lni-bell-1 lni-32"></i>
      </Link>
      <button onClick={startNewThread} className="flex flex-col items-center" aria-label="New Message">
        <i className="lni lni-message-3-text lni-32"></i>
      </button>
    </div>
  );
};

export default BottomNavbar;