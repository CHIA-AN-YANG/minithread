"use client";
import { Provider } from 'react-redux';
import { store } from '../../app/store/store';
import AuthNavbar from '../../app/components/navbar/AuthNavbar';
import LoginForm from '../../app/components/form/LoginForm';

export default function LoginPage() {

  return (
    <div className="page">
      <main className="main">
        <AuthNavbar page={"login"} />
        <LoginForm />
      </main>
    </div>
  );
}
