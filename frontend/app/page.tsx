import { InputForm } from '@/components/form/InputForm';
import { Header } from '@/components/Header';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { ThreadList } from '@/components/ThreadList';

export default function Home() {
  return (
    <div className="page">
      <main className="main-grid layout-home">
        <Header />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  )
};

