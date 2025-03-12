"use client";
/* eslint-disable @next/next/no-img-element*/
import { getUserProfile } from '@/api/authAdaptor';
import { selectUser } from '@/store/features/user/selectors/authSelectors';
import { UserData } from '@/types/api';
import { Axios, AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BaseUserPanel } from './BaseUserPanel';

const UserPanel = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const me = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
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


  if (user) {
    return (
      <>
        <BaseUserPanel user={user} isMe={isMe} isLoading={isLoading} />
      </>
    );
  }
};

export { UserPanel };
