"use client";
/* eslint-disable @next/next/no-img-element*/
import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../model/model';
import { logoutUser } from '../store/features/user/actions/userActions';
import { selectUser } from '../store/features/user/selectors/authSelectors';
import { AppDispatch } from '../store/store';
import TextDisplay from './ui/TextDisplay';

type BaseUserPanelProps = {
  user?: UserData;
  isMe: boolean;
  isLoading: boolean;
};

const BaseUserPanel: React.FC<BaseUserPanelProps> = ({ user, isMe, isLoading }) => {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  const toastBio = () => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.profilePicture || "/images/avatar-presets/avatar-13.jpg"}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {user?.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ), {
      duration: 60000,
    })
  };


  if (!isClient) return null;

  if (isLoading || !user) return (
    <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-4 gap-2 h-30 w-full overflow-hidden" >
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-8 gap-2 h-30 w-full overflow-hidden" >
      < section className="justify-start flex flex-col" >
        <div className="flex mx-2 justify-between w-full sm:border-b-2 border-primary border-solid" >
          <div className="flex flex-col" >
            <h1 className="font-bold text-md" > {user.username} {user.email} </h1>
            < h3 className="text-lg"> {user.name} </h3>
            < hr className="border-secondary" />
          </div>
          {
            isMe ? <>
              <div className="ctas px-2 ml-auto" role="button" onClick={() => router.push('/me/edit')
              }>
                <span className="secondary" > edit </span>
              </div>
              < div className="ctas" role="button" onClick={() => handleLogout()}>
                <span className="secondary" > logout </span>
              </div>
            </> : ""}
        </div>

        <TextDisplay maxHeight={80} text={user.bio || ""}
          onIconClick={toastBio} />
      </section>

      < section className="flex overflow-hidden sm:m-1 my-auto min-w-20 min-h-20 w-20 h-20 align-center border border-gray-500 rounded-lg" >
        {(user.profilePicture?.length) ?
          <Image
            src={user.profilePicture!}
            alt={user.username + "\'s picture"}
            placeholder='empty'
            width={200}
            height={200}
            onLoad={() => setImageLoaded(true)}
            priority
          /> : <Image src="/images/avatar-presets/avatar-13.jpg"
            alt={user.username + "\'s profilePicture"}
            className='object-cover mx-auto'
            width={100}
            height={100}
          />}
      </section>
    </div>
  );
};

export default BaseUserPanel;