"use client";
import OTPForm from './components/otpForm';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Post from './components/post';
import InputBar from './components/InputBar';

const commentList = [
  {
    id: "0013",
    author: "Jane Doe",
    createdAt: "2021-08-01T12:00:00Z",
    parentPost: "0012",
    content: "example reply comment for post 0012 about Tailwind CSS"
  }]

export default function Home() {
  return (
    <div className="page">
      <h1 className="secondary">Enter Verification</h1>
      <main className="main">
        <Provider store={store}>
          <Post id="0012" author="John Doe"
            createdAt="2021-08-01T12:00:00Z"
            content="example post The component now uses Tailwind CSS for styling. Tailwind's utility classes are applied directly to the elements for a clean and responsive design. Let me know if you'd like further customizations!"
          ></Post>
          <InputBar />
        </Provider>
      </main>
    </div>
  );
}
