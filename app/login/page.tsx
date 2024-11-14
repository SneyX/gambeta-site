"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { login } from './actions'
import Link from 'next/link'
import Button from '@/components/Button'
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    
    const result = await login(formData)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen padding-container">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#19bcc8] mb-8">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-left text-gray-300 text-sm">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg bg-white/10 text-gray-50 border border-gray-700 focus:border-[#19bcc8] focus:outline-none placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-left text-gray-300 text-sm">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg bg-white/10 text-gray-50 border border-gray-700 focus:border-[#19bcc8] focus:outline-none placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="flex justify-center mt-2">
              <motion.div
                className="w-full max-w-[200px] flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  title="Iniciar Sesión"
                  variant="btn_dark_green"
                  onClick={() => ''}
                />
              </motion.div>
            </div>
          </form>
          <p className="mt-8 text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link href="/signup" className="text-[#19bcc8] hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}