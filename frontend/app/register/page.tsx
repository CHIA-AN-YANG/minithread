"use client";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import AuthNavbar from '../components/navbar/AuthNavbar';
import RegisterForm from '../components/form/RegisterForm';

export default function ProfilePage() {

  return (
    <div className="page">
      <main className="main">
        <Provider store={store}>
          <AuthNavbar page={"registration"} />
          <RegisterForm />
        </Provider>
      </main>
    </div>
  );
}
