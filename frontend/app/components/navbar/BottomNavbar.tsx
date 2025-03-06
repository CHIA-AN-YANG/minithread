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
import { authedGet } from '@/app/api/baseAdaptor';

const BottomNavbar: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // 控制列表顯示
  const user = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => { setLoggedIn(Boolean(user?.username)); }, [user]);

  const showNotification = () => {
    authedGet(`/me/notification`)
    .then(response => {
      if (response && 'data' in response) {
        console.log("Notifications received:", response.data);
        setNotifications(response.data as any[]); // 正確存入通知數據
        setShowDropdown(!showDropdown);
      }
    })
    .catch(error => {
        console.error("Error receiving notifications:", error);
    });
  } 

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
      {/* 通知按鈕 */}
      <div className="relative">
        <button 
          onClick={showNotification} // 點擊時顯示/隱藏
          className="flex flex-col items-center"
          aria-label="Notifications"
        >
          <i className="lni lni-bell-1 lni-32"></i>
        </button>
        {/* 背景遮罩 + 下拉通知列表 */}
        {showDropdown && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-50"
            onClick={() => setShowDropdown(false)} // 點擊背景關閉
          >
            {/* Dropdown 貼齊按鈕 */}
            <div 
              className="absolute right-1/4 bottom-12 w-80 bg-white border rounded-lg shadow-lg p-4 max-h-[60vh] overflow-auto"
              onClick={(e) => e.stopPropagation()} // 防止點擊內部時關閉
            >
              <h3 className="text-lg font-semibold mb-2">Notifications</h3>
              {notifications.length > 0 ? (
                <ul>
                  {notifications.slice().reverse().map((notification, index) => (
                    <li key={index} className="p-3 border-b last:border-none text-sm">
                      {notification.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">No notifications</p>
              )}
            </div>
          </div>
        )}
      </div>
      <button onClick={startNewThread} className="flex flex-col items-center" aria-label="New Message">
        <i className="lni lni-message-3-text lni-32"></i>
      </button>
    </div>
  );
};

export default BottomNavbar;