"use client";

import InputForm from '@/app/components/form/InputForm';
import MePanel from '@/app/components/MePanel';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import MeNavbar from '@/app/components/navbar/MeNavbar';
import ThreadList from '@/app/components/ThreadList';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

export default function MeThreadsPage() {

  return (
    <div className="page page-me">
      <Provider store={store}>
        <main className="main-grid layout-my-profile">
          <MePanel />
          <MeNavbar />
          <ThreadList isMePage={true} />
          <BottomNavbar />
          <InputForm />
        </main>
      </Provider>
    </div>
  );
}

