"use client";
/* eslint-disable @next/next/no-img-element*/
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUser, selectStatus } from '../store/features/user/selectors/authSelectors';
import { EntityStatus } from '../model/model';
import { useRouter } from 'next/navigation';
import { loadUser, logoutUser } from '../store/features/user/actions/userActions';

const UserPanel = () => {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === EntityStatus.ERROR) { router.push('/') };
  }, [status, router]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  if (!isClient) return null;

  if (status === EntityStatus.LOADING || status === EntityStatus.IDLE) return (
    <>
      <div className="loader"></div>
      <p>{(status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "waiting..."}</p>
    </>
  );

  if (status === EntityStatus.SUCCESS) {
    if (!user) { router.push('/404'); };
    return (
      <div className="grid sm:grid-cols-[1fr_8rem] grid-cols-[1fr_5rem] sm:gap-4 gap-2 h-32 w-full overflow-hidden">
        {user ?
          <>
            <section className="justify-start flex flex-col">
              <div className="flex pb-2 justify-between w-full sm:border-b-2 border-primary border-solid">
                <div className="flex flex-col ">
                  <h3>{user.username}</h3>
                  <h3 className="font-bold">{user.name}</h3>
                </div>
                <div className="ctas px-2 ml-auto" role="button" onClick={() => router.push('/me/edit')}>
                  <span className="secondary">edit</span>
                </div>
                <div className="ctas" role="button" onClick={() => handleLogout()}>
                  <span className="secondary">logout</span>
                </div>
              </div>
              <hr />

              <div className="h-15 flex overflow-y-scroll">
                <p>{user.bio}</p>
              </div>
            </section>

            <section className="flex overflow-hidden sm:m-1 my-auto min-w-20 min-h-20 w-20 h-20 align-center border border-gray-500 rounded-lg">
              <Image src="/images/avatar-presets/avatar-13.jpg"
                alt={user.username + "\'s profilePicture"}
                className='object-cover mx-auto'
                width={100}
                height={100}
              />
              {(user.profilePicture?.length) && imageLoaded &&
                <Image
                  src={user.profilePicture!}
                  alt={user.username + "\'s picture"}
                  placeholder='empty'
                  width={200}
                  height={200}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              }
            </section>
          </> : <div className="loader"></div>}
      </div >
    );
  }
};

export default UserPanel;