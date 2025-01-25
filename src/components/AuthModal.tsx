import React, { useState } from 'react';
import { Mail, Lock, X } from 'lucide-react';
import { api } from '../lib/api';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAuthSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [authLoading, setAuthLoading] = useState(false);
	const [authError, setAuthError] = useState<string | null>(null);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setAuthLoading(true);
		setAuthError(null);

		try {
			await api.login(email, password);
			setEmail('');
			setPassword('');
			onAuthSuccess();
			onClose();
		} catch (error) {
			setAuthError(error instanceof Error ? error.message : 'Failed to sign in');
		} finally {
			setAuthLoading(false);
		}
	};

	const handleSignUp = async () => {
		setAuthLoading(true);
		setAuthError(null);

		try {
			await api.register(email, password);
			await api.login(email, password);
			setEmail('');
			setPassword('');
			onAuthSuccess();
			onClose();
		} catch (error) {
			setAuthError(error instanceof Error ? error.message : 'Failed to sign up');
		} finally {
			setAuthLoading(false);
		}
	};
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Sign In</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {authError && (
            <p className="text-red-400 text-sm">{authError}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={authLoading}
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50"
            >
              {authLoading ? 'Processing...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={authLoading}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
	);
}