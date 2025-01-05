"use client";
import UserProfile from '../components/UserPanel';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MeNavbar from '../components/navbar/MeNavbar';
import PostList from '../components/ThreadList';
import InputForm from '../components/form/InputForm';
import BottomNavbar from '../components/navbar/BottomNavbar';

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
