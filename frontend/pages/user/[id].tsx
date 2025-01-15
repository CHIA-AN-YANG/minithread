import InputForm from '@/app/components/form/InputForm';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import UserNavbar from '@/app/components/navbar/UserNavbar';
import ThreadList from '@/app/components/ThreadList';
import UserPanel from '@/app/components/UserPanel';

export default function UserThreadsPage() {

  return (
    <div className="page">
      <main className="main-my-profile">
        <UserPanel />
        <UserNavbar />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  );
}