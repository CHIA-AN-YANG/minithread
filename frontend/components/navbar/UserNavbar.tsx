"use client";
import { followUser, unfollowUser } from '@/api/authAdaptor';
import { selectUser } from '@/store/features/user/selectors/authSelectors';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';



const UserNavbar: React.FC = () => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const user = useSelector(selectUser);
  const params = useParams();

  useEffect(() => {
    if (user && user.followed) {
      const isFollowing = user.followed.includes(params.id as string);
      setIsFollowing(isFollowing);
    }
  }, [user, params.id]);

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to follow user");
      return
    }
    if (isFollowing) {
      toast.custom((t) => (
        <div className="bg-amber-50 text-black p-4 rounded-lg flex flex-col items-center border border-stone-500">
          <div className="text-md p-4">Are you sure you would like to unfollow {params.id as string}? </div>
          <div className='flex gap-5 w-full'>
            <button className="btn col-6 bg-stone-500 px-2 py-1 rounded-lg text-white"
              onClick={() => {
                handleUnfollow();
                toast.dismiss(t.id);
              }}>Yes</button>
            <button className="btn col-6 border border-stone-500 px-2 py-1 rounded-lg text-stone" onClick={() => toast.dismiss(t.id)}>No</button>
          </div>
        </div>
      ));
    } else {
      handleFollow();
    }
  }

  const handleFollow = () => {
    followUser(params.id as string)
      .then(() => {
        setIsFollowing(true);
      }).catch((e) => {
        console.error(e);
        toast.error("Could not follow user");
      });
  }

  const handleUnfollow = () => {
    unfollowUser(params.id as string)
      .then(() => {
        setIsFollowing(false);
      }).catch((e) => {
        console.error(e);
        toast.error("Could not unfollow user");
      });
  }


  return (
    <div className="flex w-full justify-around mb-2">
      <button className={"btn grow mr-1 py-2 text-center bg-blue-200 line-h-1 text-blue-700 border-blue-700 border rounded-lg leading-none uppercase"}
        onClick={handleClick}>
        {isFollowing ? 'unfollow' : 'follow'}
      </button>
    </div>
  );
};

export { UserNavbar };
