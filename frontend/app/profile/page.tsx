"use client";
import UserProfile from '../components/userProfile';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store/store';
import MeNavbar from '../components/meNavbar';
import PostList from '../components/PostList';
import { selectUser } from '../store/features/user/selectors/authSelectors';
import { useState, useEffect } from 'react';
import { UserData } from '../model/model';
import InputBar from '../components/InputBar';

export default function ProfilePage() {
  // const [isClient, setIsClient] = useState(false);




  return (
    <div className="page">
      <main className="main-profile">
        <Provider store={store}>
          <UserProfile />
          <MeNavbar page="me" />
          <PostList isMePage={true} />
          <InputBar />
        </Provider>
      </main>
    </div>
  );
}
