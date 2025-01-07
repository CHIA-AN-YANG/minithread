"use client";
import RegisterForm from '@/app/components/form/RegisterForm';
import AuthNavbar from '@/app/components/navbar/AuthNavbar';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

export default function RegisterPage() {

  return (
    <div className="page">
      <main className="main">
        <AuthNavbar page={"registration"} />
        <RegisterForm />
      </main>
    </div>
  );
}