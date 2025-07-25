'use client';

import { useState } from 'react';
import SupabaseAuth from '../../components/SupabaseAuth';

export default function SupabaseAuthExample() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Authentication Example</h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${authMode === 'signin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${authMode === 'signup' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <SupabaseAuth mode={authMode} />
      </div>

      <div className="mt-12 bg-blue-50 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">How This Works</h2>
        <p className="mb-4">
          This example demonstrates how to implement authentication with Supabase in a Next.js application:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>We use the Supabase JavaScript client for authentication</li>
          <li>The SupabaseAuth component handles both sign-in and sign-up flows</li>
          <li>User data is stored in Supabase's auth system and users table</li>
          <li>We handle form validation, loading states, and error messages</li>
          <li>On successful authentication, the user would be redirected to the home page</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> This is a demonstration. In a production application, you would want to implement proper
          redirect handling, session management, and protected routes.
        </p>
      </div>
    </div>
  );
}