"use client"

import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('name')
          .eq('id', user.id)
          .single()

        if (!error && userData) {
          setUsername(userData.name)
        }
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', currentUser.id)
          .single()

        if (!error && userData) {
          setUsername(userData.username)
        }
      } else {
        setUsername(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <motion.p className="font-bold text-xl text-[#19bcc8]"
          initial={{ translateY: '-100px' }}
          animate={{ translateY: '0' }}
          transition={{ duration: 0.1 }}
        >Gambeta</motion.p>
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link, index) => (
          <motion.div
            initial={{ translateY: '-100px' }}
            animate={{ translateY: '0' }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={link.key}
          >
            <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          </motion.div>
        ))}
      </ul>

      <motion.div className="lg:flexCenter hidden"
        initial={{ translateY: '-100px' }}
        animate={{ translateY: '0' }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.3, delay: 0 } }}              
        whileTap={{ scale: 0.9, transition: { duration: 0.2, delay: 0 } }}
      >
        {user ? (
          <Link href="/login">
            <Button 
              type="button"
              title="Cerrar Sesion"
              icon="/user.svg"
              variant="btn_dark_green"
            />
          </Link>
        ) : (
          <Link href="/login">
            <Button 
              type="button"
              title="Iniciar Sesion"
              icon="/user.svg"
              variant="btn_dark_green"
            />
          </Link>
        )}
      </motion.div>

      <Image 
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  )
}

export default Navbar
