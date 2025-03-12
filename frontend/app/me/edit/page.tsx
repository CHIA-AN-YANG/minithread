import { MeUpdateForm } from '@/components/form/MeUpdateForm';
import { Header } from '@/components/Header';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { ToasterClient } from '@/components/ToasterClient';

export default function MeEditPage() {

  return (
    <div className="page page-me">
      <main className="main-grid layout-home">
        <Header style={"no-border"} />
        <MeUpdateForm />
        <BottomNavbar />
      </main>
      <ToasterClient />
    </div>
  );
}