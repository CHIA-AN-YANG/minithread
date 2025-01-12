"use client";
/* eslint-disable @next/next/no-img-element*/
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUser, selectStatus } from '../store/features/user/selectors/authSelectors';
import { EntityStatus, UserData } from '../model/model';
import { loadUser, logoutUser } from '../store/features/user/actions/userActions';
import { getUserProfile } from '../api/authAdaptor';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Axios, AxiosResponse } from 'axios';

const UserPanel = () => {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector(selectUser);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsClient(true);
    setIsMe(Boolean(me?.username === id));
    setIsLoading(true);
    console.log(id, typeof id);
    if (typeof id === 'string') {
      getUserProfile(id).then((response) => {
        if (response instanceof Axios) {
          toast.error("Error fetching user profile");
        }
        const user = (response as AxiosResponse<UserData>).data;
        setUser(user);
      }).catch((err) => {
        console.error(err);
        toast.error("Error fetching user profile");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  if (!isClient) return null;

  if (isLoading) return (
    <>
      <div className="loader"></div>
    </>
  );

  return (
    <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-4 gap-2 h-32 w-full overflow-hidden">
      {user ?
        <>
          <section className="justify-start flex flex-col">
            <div className="flex pb-2 justify-between w-full sm:border-b-2 border-primary border-solid">
              <div className="flex flex-col ">
                <h1 className="font-bold text-md">{user.username} {user.email}</h1>
                <h3>{user.name}</h3>
              </div>
              {isMe ? <>
                <div className="ctas px-2 ml-auto" role="button" onClick={() => router.push('/me/edit')}>
                  <span className="secondary">edit</span>
                </div>
                <div className="ctas" role="button" onClick={() => handleLogout()}>
                  <span className="secondary">logout</span>
                </div>
              </> : ""}
            </div>
            <hr className="border-secondary" />

            <div className="h-15 flex overflow-y-scroll">
              <p>{user.bio}</p>
            </div>
          </section>

          <section className="flex overflow-hidden sm:m-1 my-auto min-w-20 min-h-20 w-20 h-20 align-center border border-gray-500 rounded-lg">
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
              />
            }
          </section>
        </> : <div className="w-full col-span-2 h-full flex justify-center items-center">
          <div className="loader"></div>
        </div>}
    </div >
  );
};

export default UserPanel;