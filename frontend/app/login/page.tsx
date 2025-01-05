"use client";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import AuthNavbar from '../components/navbar/AuthNavbar';
import LoginForm from '../components/form/LoginForm';

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
