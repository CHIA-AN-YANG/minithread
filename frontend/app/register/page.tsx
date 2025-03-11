import { RegisterForm } from '@/components/form/RegisterForm';
import { Header } from '@/components/Header';
import { AuthNavbar } from '@/components/navbar/AuthNavbar';

export default function RegisterPage() {

  return (
    <div className="page  page-form">
      <main className="main overflow-hidden h-full rounded-lg sm:h-fit sm:overflow-auto">
        <Header style={"form"} />
        <AuthNavbar page={"registration"} />
        <RegisterForm />
      </main>
    </div>
  );
}