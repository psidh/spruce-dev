'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [isAdmin, setIsAdmin] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      if (
        (isAdmin && user.email.includes('.admin@')) || 
        (!isAdmin && user.email.includes('.operator@'))
      ) {
        const response = await axios.post('/api/users/signup', {
          ...user,
          isAdmin,
        });

        console.log('Sign Success', response.data);
        router.push('/login');
      } else {
        toast.error('Invalid email for admin or operator signup');
      }
    } catch (error: any) {
      console.log('SignUp Failed');
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center bg-body">
        <div
          className="p-5 md:py-6 md:px-16 w-[80%] md:w-[40%] backdrop-xl 
        bg-opacity-80 border bg-white border-gray-200 rounded-xl
        flex flex-col justify-center"
        >
          <h1 className="text-4xl my-4">
            {loading ? 'Processing...' : 'Sign Up'}
          </h1>
          <hr className="border-gray-600 py-1 w-full my-4" />
          <label htmlFor="username" className="mt-2 mb-2">
            Username
          </label>
          <input
            className="p-2 rounded-md mb-2 border border-[#969696]"
            id="username"
            type="text"
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
          />
          <label htmlFor="email" className="mt-2 mb-2">
            Email
          </label>
          <input
            className="p-2 rounded-md mb-2 border border-[#969696]"
            id="email"
            type="email"
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
          <label htmlFor="password" className="mt-2 mb-2">
            Password
          </label>
          <input
            className="p-2 rounded-md mb-2 border border-[#969696]"
            id="password"
            type="password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
          
          <div className="flex items-center justify-center">
            {/* Button for Admin */}
            <button
              className={`py-2 px-8 my-6 border text-center rounded-l-md transition duration-300 w-full ${
                isAdmin
                  ? 'bg-red-600 text-white hover:bg-red-800 w-full'
                  : 'bg-gray-200 text-gray-600  w-full'
              }`}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </button>
            {/* Button for Operator */}
            <button
              className={`py-2 px-8 my-6 border text-center rounded-r-md transition duration-300 w-full ${
                !isAdmin
                  ? 'bg-red-600 text-white hover:bg-red-800 w-full'
                  : 'bg-gray-200 text-gray-600 w-full'
              }`}
              onClick={() => setIsAdmin(false)}
            >
              Operator
            </button>
          </div>
          {!buttonDisabled ? (
            <button
              onClick={onSignUp}
              className="py-2 px-8 my-6 border text-center rounded-md 
            transition duration-300 bg-blue-600 text-white hover:bg-blue-800"
            >
              SignUp
            </button>
          ) : (
            <p className="py-2 px-8 my-6 text-center rounded-xl text-gray-600 transition duration-300 bg-gray-200">
              SignUp
            </p>
          )}
          <Link href={'/login'} className="hover:underline">
            Already a User? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
