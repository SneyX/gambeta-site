import { login } from "@/app/login/actions"
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-blue-800 to-red-800">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Welcome Back!
        </h1>
        
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          formAction={login}
          className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition-colors"
        >
          Log in
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-900 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}