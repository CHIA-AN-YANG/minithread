import { LoginForm } from '@/components/form/LoginForm';
import { Header } from '@/components/Header';
import { AuthNavbar } from '@/components/navbar/AuthNavbar';

export default function LoginPage() {

  return (
    <div className="page page-form">
      <main className="main overflow-hidden h-full rounded-lg sm:h-fit sm:overflow-auto">
        <Header style={"form"} />
        <AuthNavbar page={"login"} />
        <LoginForm />
      </main>
    </div>
  );
}
