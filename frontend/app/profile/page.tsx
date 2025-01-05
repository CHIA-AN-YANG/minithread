"use client";
import UserProfile from '../components/userProfile';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MeNavbar from '../components/meNavbar';
import PostList from '../components/PostList';
import InputForm from '../components/InputForm';
import BottomNavbar from '../components/BottomNavbar';

export default function ProfilePage() {


  return (
    <div className="page">

      <Provider store={store}>
        <main className="main-profile">
          <UserProfile />
          <MeNavbar page="me" />
          <PostList isMePage={true} />
          <BottomNavbar />
          <InputForm />
        </main>
      </Provider>

    </div>
  );
}
