"use client";

import React, { useEffect, useState } from 'react';
import { getAuth } from '../../store/features/user/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectError, selectUser } from '../../store/features/user/selectors/authSelectors';
import { AppDispatch } from '../../store/store';
import { useRouter } from 'next/navigation';
import { EntityStatus } from '../../model/model';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus) as string;
  const apiErrorMsg = useSelector(selectError) as string;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === EntityStatus.SUCCESS) {
      router.push('/me/threads');
    }
  }, [status]);

  useEffect(() => {
    if (apiErrorMsg && apiErrorMsg.includes('401')) {
      setErrorMessage("The username or passoword you entered is invalid.");
    }
  }, [apiErrorMsg]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (status === EntityStatus.LOADING || status === EntityStatus.SUCCESS) {
    return (
      <>
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
          <div className='loader'></div>
          <p className='loading-msg'>{
            (status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "verifying..."
          }</p>
        </div>
      </>);
  }

  if (!isClient) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.username || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('username', formData.username);
    formDataObj.append('password', formData.password);
    dispatch(getAuth(formDataObj));
  };

  return (
    <div className="w-full h-full p-6 bg-white/75 sm:shadow-md sm:rounded-lg">
      <h2 className="text-xl font-bold my-4 text-center">Login with existing account</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-500">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-500">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
        <button
          className="w-full bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => router.back()}>
          Go back
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage || apiErrorMsg}</p>}
      {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
    </div>
  );
};

export default LoginForm;