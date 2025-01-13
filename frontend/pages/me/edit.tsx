"use client";
import MeUpdateForm from '@/app/components/form/MeUpdateForm';
import Header from '@/app/components/Header';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import { Toaster } from 'react-hot-toast';

export default function MeEditPage() {

  return (
    <div className="page page-me">
      <main className="main-home">
        <Header style={"no-border"} />
        <MeUpdateForm />
        <BottomNavbar />
      </main>
      <div><Toaster /></div>
    </div>
  );
}