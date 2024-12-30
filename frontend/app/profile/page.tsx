"use client";
import UserProfile from '../components/userProfile';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function ProfilePage() {

  return (
    <div className="page">
      <main className="main">
        <Provider store={store}>
          <UserProfile />
        </Provider>
      </main>
    </div>
  );
}
