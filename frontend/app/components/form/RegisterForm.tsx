import React, { useEffect, useState } from 'react';
import { registerUser } from '../../api/authAdaptor';
import { useSelector } from 'react-redux';
import { selectError } from '../../store/features/user/selectors/authSelectors';
import { useRouter } from 'next/router';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const apiErrorMsg = useSelector(selectError) as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (apiErrorMsg && apiErrorMsg.includes('401')) {
      setErrorMessage("The code you enter is not valid.");
    }
  }, [apiErrorMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      const response = await registerUser(data);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Registration successful!');
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="w-full p-6 bg-white sm:shadow-md rounded-lg">
      <h2 className="text-xl font-bold my-4 text-center">Register for fascinating posts!</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-500">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-500">email</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-500">password</label>
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Register
        </button>
        <button
          className="w-full bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => router.back()}>
          No, not yet.
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage || apiErrorMsg}</p>}
      {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
    </div>
  );
};

export default RegisterForm;
