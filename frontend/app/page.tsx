import { NextPage } from 'next';
import { Header } from './components/Header';

const Home: NextPage = () => (
  <div className="page">
    <main className="main-grid layout-home">
      <Header />
      {/* <ThreadList isMePage={false} /> */}
      {/* <BottomNavbar /> */}
      {/* <InputForm /> */}
    </main>
  </div>
);

export default Home;
