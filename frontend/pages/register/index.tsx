"use client";
import RegisterForm from '@/app/components/form/RegisterForm';
import Header from '@/app/components/Header';
import AuthNavbar from '@/app/components/navbar/AuthNavbar';

export default function RegisterPage() {

  return (
    <div className="page">
      <main className="main overflow-hidden h-full rounded-lg sm:h-fit sm:overflow-auto">
        <Header />
        <AuthNavbar page={"registration"} />
        <RegisterForm />
      </main>
    </div>
  );
}