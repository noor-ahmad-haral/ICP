import React from 'react';
import Image from 'next/image';

const SignUpPage: React.FC = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <Image src="/black-logo.png" alt="Logo" width={200} height={200} />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Sign Up</h1>
          <p className="text-sm text-gray-600 text-center">Create an account to access all the features of our platform.</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" required className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 placeholder-gray-400" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 placeholder-gray-400" placeholder="Enter your email address" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" autoComplete="new-password" required className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 placeholder-gray-400" placeholder="Enter your password" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 placeholder-gray-400" placeholder="Confirm your password" />
          </div>
          <div>
            <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
