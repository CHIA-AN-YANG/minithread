import { InputForm } from '@/app/components/form/InputForm';
import { BottomNavbar } from '@/app/components/navbar/BottomNavbar';
import { UserNavbar } from '@/app/components/navbar/UserNavbar';
import { ThreadList } from '@/app/components/ThreadList';
import { UserPanel } from '@/app/components/UserPanel';
import { Toaster } from 'react-hot-toast';

export default function UserThreadsPage() {

  return (
    <div className="page">
      <main className="main-grid layout-user-profile">
        <UserPanel />
        <UserNavbar />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
        <div><Toaster /></div>
      </main>
    </div>
  );
}