import { InputForm } from '@/components/form/InputForm';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { UserNavbar } from '@/components/navbar/UserNavbar';
import { UserPanel } from '@/components/panel/UserPanel';
import { ThreadList } from '@/components/ThreadList';
import { ToasterClient } from '@/components/ToasterClient';

export default function UserThreadsPage() {

  return (
    <div className="page">
      <main className="main-grid layout-user-profile">
        <UserPanel />
        <UserNavbar />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
        <ToasterClient />
      </main>
    </div>
  );
}