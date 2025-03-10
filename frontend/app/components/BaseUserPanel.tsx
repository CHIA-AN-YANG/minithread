"use client";
/* eslint-disable @next/next/no-img-element*/
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { UserData } from '../model/model';
import { logoutUser } from '../store/features/user/actions/userActions';
import { AppDispatch } from '../store/store';
import { TextDisplay } from './ui/TextDisplay';

type BaseUserPanelProps = {
  user?: UserData;
  isMe: boolean;
  isLoading: boolean;
};

const BaseUserPanel: React.FC<BaseUserPanelProps> = ({ user, isMe, isLoading }) => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  const getFollowed = (list: string[]) => {
    if (list.length === 0) return "0 followers";
    if (list.length === 1) return `Followed by ${list[0]}`;
    if (list.length > 1) return `Followed by ${list[0]} and ${list.length - 1} others`;
  }

  const toastBio = () => {
    toast((t) => <>
      <div className="pl-2 pb-2 pt-2 flex items-start">
        <div className='flex flex-col'>
          <h2 className="text-md text-bold text-primaryDark mb-2">{user?.username || ''} {user?.name}</h2>
          <p className="text-lg text-gray-500">{user?.bio || ''}</p>
        </div>
        <button className='text-stone-700 text-lg leading-none bg-gray-300 rounded-full flex justify-center items-center'
          onClick={() => toast.dismiss(t.id)}>
          <i className="lni lni-xmark"></i>
        </button>
      </div>
    </>, {
      duration: 60000
    });
  };


  if (!isClient) return null;

  if (isLoading || !user) return (
    <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-4 gap-2 h-30 w-full overflow-hidden" >
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-8 gap-2 h-30 w-full overflow-hidden" >
      < section className="relative justify-start flex flex-col" >
        <div className="flex mx-2 justify-between w-full sm:border-b-2 border-primary border-solid" >
          <div className="flex flex-col" >
            <h1 className="font-bold text-md text-primaryDark"> {user.username}</h1>
            <div className='flex gap-4 items-end'>
              <h3 className="text-lg text-primaryDark"> {user.name} </h3>
              <span className="text-xs inline-block pb-1 text-gray-500"> {getFollowed(user.followed || [])} </span>
            </div>
            < hr className="border-secondary" />
          </div>
          {
            isMe ? <div className="absolute flex top-0 right-0 gap-5" >
              <div className="inline leading-4 px-2 pb-1 rounded-lg bg-sky-200 text-blue-700"
                role="button"
                onClick={() => router.push('/me/edit')}>
                edit
              </div>
              < div className="inline leading-4 px-2 pb-1 rounded-lg bg-sky-200 text-blue-700" role="button" onClick={() => handleLogout()}>
                logout
              </div>
            </div> : ""}
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

export { BaseUserPanel };
