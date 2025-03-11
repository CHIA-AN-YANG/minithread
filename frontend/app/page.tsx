import { InputForm } from '@/components/form/InputForm';
import { Header } from '@/components/Header';
import { BottomNavbar } from '@/components/navbar/BottomNavbar';
import { ThreadList } from '@/components/ThreadList';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <div className="page">
    <main className="main-grid layout-home">
      <Header />
      <ThreadList isMePage={false} />
      <BottomNavbar />
      <InputForm />
    </main>
  </div>
);

export default Home;
