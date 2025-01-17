"use client";

import Header from '@/app/components/Header';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import ThreadList from '@/app/components/ThreadList';
import { NextPage } from 'next';
import InputForm from '../app/components/form/InputForm';

const Home: NextPage = () => {

  return (
    <div className="page">
      <main className="main-grid layout-home">
        <Header />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  );
}

export default Home;
