import { InputForm } from '@/components/form/InputForm';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { SingleThread } from '@/components/ThreadSingle';
import { ToasterClient } from '@/components/ToasterClient';

export default function ThreadPage() {

  return (
    <div className="page">
      <main className="main-grid layout-single-thread">
        <SingleThread />
        <BottomNavbar />
        <InputForm />
        <ToasterClient />
      </main>
    </div>
  );
}

