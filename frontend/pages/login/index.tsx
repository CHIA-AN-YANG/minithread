import AuthNavbar from '../../app/components/navbar/AuthNavbar';
import LoginForm from '../../app/components/form/LoginForm';
import Header from '@/app/components/Header';

export default function LoginPage() {

  return (
    <div className="page">
      <main className="main overflow-hidden h-full rounded-lg sm:h-fit sm:overflow-auto">
        <Header />
        <AuthNavbar page={"login"} />
        <LoginForm />
      </main>
    </div>
  );
}
