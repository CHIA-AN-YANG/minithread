"use client";
import UserProfile from '../components/userProfile';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import RegisterForm from '../components/registerForm';
import AuthNavbar from '../components/authNavbar';

export default function ProfilePage() {

  return (
    <div className="page">
      <main className="main">
        <Provider store={store}>
          <AuthNavbar page={"registration"} />
          <RegisterForm />
        </Provider>
      </main>
    </div>
  );
}
