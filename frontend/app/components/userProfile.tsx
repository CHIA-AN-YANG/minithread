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

const UserProfile = () => {
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
      <div className='user-profile-panel'>
        {user ?
          <>
            <section className='left-panel'>
              <div>
                <h3>id: {user.username}!</h3>
                <h3 className='welcome-txt'><em>name: Anna Yang{user.name}</em></h3>
                <hr />
              </div>

              <div className="intro">
                <p>{user.bio} is Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, consequuntur.</p>
              </div>

              <div className="ctas" role="button" onClick={() => handleLogout()}>
                <span className="secondary">logout</span>
              </div>
            </section>
            <section className='right-panel'>
              <Image src="/images/default-profile-picture.jpg"
                alt={user.username + "\'s profilePicture"}
                width={100}
                height={100}
              />
              {(user.profilePicture?.length) && imageLoaded &&
                <Image
                  src={user.profilePicture!}
                  alt={user.username + "\'s photo"}
                  placeholder='empty'
                  width={400}
                  height={253}
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

export default UserProfile;