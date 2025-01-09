"use client";
import MeUpdateForm from '@/app/components/form/MeUpdateForm';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';

export default function MeEditPage() {

  return (
    <div className="page">
      <main className="main">
        <MeUpdateForm />
        <BottomNavbar />
      </main>
    </div>
  );
}