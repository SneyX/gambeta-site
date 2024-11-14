"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'
import { signup } from '../login/actions'
import { Mail, Lock, User, X } from 'lucide-react'

interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
}

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}
    
    // Username validation
    if (username.length < 3) {
      errors.username = 'El nombre debe tener al menos 3 caracteres'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = 'Por favor, introduce un email válido'
    }
    
    // Password validation
    if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (!/\d/.test(password)) {
      errors.password = 'La contraseña debe contener al menos un número'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) {
      return
    }
    
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('username', username)
    
    try {
      const result = await signup(formData)
      // Handle successful signup
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error')
      setShowModal(true)
    }
  }

  // Add the ErrorModal component inside the main component
  const ErrorModal = () => (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-gray-800 p-6 rounded-2xl w-full max-w-md relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-[#19bcc8] mb-4">Error</h2>
            <p className="text-gray-300">{error}</p>
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#19bcc8]/10 text-[#19bcc8] rounded-lg hover:bg-[#19bcc8]/20 transition-colors"
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Update the input fields to show validation errors
  return (
    <div className="flex flex-col items-center justify-center min-h-screen padding-container">
      <ErrorModal />
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#19bcc8] mb-8">Crear Cuenta</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-left text-gray-300 text-sm">
                Nombre
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 pl-10 rounded-lg bg-white/10 text-gray-50 border ${
                    validationErrors.username ? 'border-red-500' : 'border-gray-700'
                  } focus:border-[#19bcc8] focus:outline-none placeholder:text-gray-500`}
                  required
                />
              </div>
              {validationErrors.username && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.username}</p>
              )}
            </div>

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
                  className={`w-full p-3 pl-10 rounded-lg bg-white/10 text-gray-50 border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-700'
                  } focus:border-[#19bcc8] focus:outline-none placeholder:text-gray-500`}
                  required
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
              )}
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
                  className={`w-full p-3 pl-10 rounded-lg bg-white/10 text-gray-50 border ${
                    validationErrors.password ? 'border-red-500' : 'border-gray-700'
                  } focus:border-[#19bcc8] focus:outline-none placeholder:text-gray-500`}
                  required
                />
              </div>
              {validationErrors.password && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex justify-center mt-2">
              <motion.div
                className="w-full max-w-[200px] flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  title="Registrarse"
                  variant="btn_dark_green"
                />
              </motion.div>
            </div>
          </form>
          <p className="mt-8 text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-[#19bcc8] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 