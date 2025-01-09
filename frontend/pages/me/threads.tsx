"use client";

import InputForm from '@/app/components/form/InputForm';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import MeNavbar from '@/app/components/navbar/MeNavbar';
import ThreadList from '@/app/components/ThreadList';
import UserPanel from '@/app/components/UserPanel';
import { selectStatus } from '@/app/store/features/user/selectors/authSelectors';
import { store } from '@/app/store/store';
import { Provider, useSelector } from 'react-redux';

export default function MeThreadsPage() {

  return (
    <div className="page">
      <Provider store={store}>
        <main className="main-profile">
          <UserPanel />
          <MeNavbar />
          <ThreadList isMePage={true} />
          <BottomNavbar />
          <InputForm />
        </main>
      </Provider>
    </div>
  );
}

