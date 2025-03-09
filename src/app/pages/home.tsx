// src/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      title: 'App.tsx',
      description: 'Main component setting up routes and navigation for the app using React Router.',
    },
    {
      title: 'Home.tsx',
      description: 'Simple homepage with a welcome message and link to the login, styled with Tailwind CSS.',
    },
    {
      title: 'page.tsx',
      description: 'Exports the LoginPage component, serving as the login page route.',
    },
    {
      title: 'login-form.tsx',
      description: 'Contains the LoginForm component for the login UI.',
    },
    {
      title: 'main.tsx',
      description: 'Entry point rendering the App component into the DOM.',
    },
    {
      title: 'index.css',
      description: 'Global stylesheet with Tailwind CSS directives for app styling.',
    },
    {
      title: 'tailwind.config.js',
      description: 'Tailwind CSS configuration file specifying files to scan for classes.',
    },
    {
      title: 'vite.config.ts',
      description: 'Vite configuration for the React + TypeScript environment.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our App</h1>
          <p className="text-gray-600 mb-6">
            This is the homepage—start here and navigate to the login page to access your account.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login Page
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;