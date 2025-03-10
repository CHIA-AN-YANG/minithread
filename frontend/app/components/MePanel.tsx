"use client";
/* eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { EntityStatus } from '../model/model';
import { loadUser } from '../store/features/user/actions/userActions';
import { selectStatus, selectUser } from '../store/features/user/selectors/authSelectors';
import { AppDispatch } from '../store/store';
import { BaseUserPanel } from './BaseUserPanel';

const MePanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === EntityStatus.ERROR) {
      router.push('/')
      toast.error("Your session has expired. Please login again.");
    };
  }, [status, router]);

  if (status === EntityStatus.LOADING || status === EntityStatus.IDLE) return (
    <>
      <div className="loader"></div>
      <p>{(status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "waiting..."}</p>
    </>
  );

  if (status === EntityStatus.SUCCESS) {
    return (<>
      {user ? <BaseUserPanel user={user!} isMe={true} isLoading={false} /> : ""}
    </>
    );
  }
};

export { MePanel };