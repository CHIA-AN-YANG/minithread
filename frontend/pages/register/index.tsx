"use client";
import RegisterForm from '@/app/components/form/RegisterForm';
import AuthNavbar from '@/app/components/navbar/AuthNavbar';

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