"use client";
import UserProfile from '../components/userProfile';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MeNavbar from '../components/meNavbar';

export default function ProfilePage() {

  return (
    <div className="page">
      <main className="main">
        <Provider store={store}>
          <UserProfile />
          <MeNavbar page="me" />
        </Provider>
      </main>
    </div>
  );
}
