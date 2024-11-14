"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen padding-container">
      <motion.div
        className="text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-[#19bcc8] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-50 mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Button 
              type="button"
              title="Volver al inicio"
              variant="btn_dark_green"
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
} 