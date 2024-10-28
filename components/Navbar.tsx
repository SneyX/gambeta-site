"use client"

import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { motion } from 'framer-motion'

const Navbar = () => {
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
        <Button 
          type="button"
          title="Iniciar Sesion"
          icon="/user.svg"
          variant="btn_dark_green"
        />
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