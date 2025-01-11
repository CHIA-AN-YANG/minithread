"use client";

import { Provider, useSelector } from 'react-redux';
import InputForm from '../app/components/form/InputForm';
import { store } from '../app/store/store';
import ThreadList from '@/app/components/ThreadList';
import { NextPage } from 'next';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import Head from 'next/head'
import Header from '@/app/components/Header';

const Home: NextPage = () => {

  return (
    <div className="page">
      <main className="main-home">
        <Header />
        <ThreadList isMePage={false} />
        <BottomNavbar />
        <InputForm />
      </main>
    </div>
  );
}

export default Home;
