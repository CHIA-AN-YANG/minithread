"use client";

import InputForm from '@/app/components/form/InputForm';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import MeNavbar from '@/app/components/navbar/MeNavbar';
import ThreadList from '@/app/components/ThreadList';
import UserPanel from '@/app/components/UserPanel';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

export default function MeCommentsPage() {
  return (
    <div className="page">
      <main className="main-profile">
        <UserPanel />
        <MeNavbar page="me" />
        <ThreadList isMePage={true} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  );
}

