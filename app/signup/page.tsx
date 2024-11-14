import { signup } from "@/app/login/actions"
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-blue-800 to-red-800">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Join SportMatch
        </h1>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          formAction={signup}
          className="w-full bg-red-800 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Sign up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-900 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
} 