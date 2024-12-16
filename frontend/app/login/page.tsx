"use client";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import LoginForm from '../components/loginForm';
import AuthNavbar from '../components/authNavbar';

export default function ProfilePage() {

  return (
    <div className="page">
      <main className="main">
        <Provider store={store}>
          <AuthNavbar page={"login"} />
          <LoginForm />
        </Provider>
      </main>
    </div>
  );
}
