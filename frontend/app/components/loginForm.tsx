"use client";

import React, { useEffect, useState } from 'react';
import { getAuth } from '../store/features/user/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectError } from '../store/features/user/selectors/authSelectors';
import { AppDispatch } from '../store/store';
import router from 'next/router';
import { EntityStatus } from '../model/model';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus) as string;
  const apiErrorMsg = useSelector(selectError) as string;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === EntityStatus.SUCCESS) {
      router.push('/profile');
    }
  }, [status, router]);

  useEffect(() => {
    if (apiErrorMsg && apiErrorMsg.includes('401')) {
      setErrorMessage("The code you enter is not valid.");
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
        <div className="loader"></div>
        <p className="loading-msg">{
          (status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "code authenticated..."
        }</p>
      </>);
  }

  if (!isClient) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    dispatch(getAuth(formDataObj));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage || apiErrorMsg}</p>}
      {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
    </div>
  );
};

export default LoginForm;