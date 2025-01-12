"use client";

import InputForm from '@/app/components/form/InputForm';
import MePanel from '@/app/components/MePanel';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import MeNavbar from '@/app/components/navbar/MeNavbar';
import ThreadList from '@/app/components/ThreadList';
import UserPanel from '@/app/components/UserPanel';
import { selectStatus } from '@/app/store/features/user/selectors/authSelectors';
import { store } from '@/app/store/store';
import { Provider, useSelector } from 'react-redux';

export default function MeThreadsPage() {

  return (
    <div className="page page-me">
      <Provider store={store}>
        <main className="main-my-profile">
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

