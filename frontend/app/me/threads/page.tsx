import { InputForm } from '@/components/form/InputForm';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { MeNavbar } from '@/components/navbar/MeNavbar';
import { MePanel } from '@/components/panel/MePanel';
import { ThreadList } from '@/components/ThreadList';

export default function MeThreadsPage() {

  return (
    <div className="page page-me">
      <main className="main-grid layout-my-profile">
        <MePanel />
        <MeNavbar />
        <ThreadList isMePage={true} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  );
}

