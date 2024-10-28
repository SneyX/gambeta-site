import React from 'react'
import Button from './Button'
import Image from 'next/image'
import { motion } from 'framer-motion'

const GetApp = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flexCenter w-full flex-col pb-[100px]" id='download'>
      <div className="get-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">¡Obtener ahora gratis!</h2>
          <p className="regular-16 text-gray-10">Disponible en iOS y Android</p>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
            <Button 
              type="button"
              title="App Store"
              icon="/apple.svg"
              variant="btn_white"
              full
            />
            <Button 
              type="button"
              title="Play Store"
              icon="/android.svg"
              variant="btn_dark_green_outline"
              full
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-1 items-center justify-end">
          <Image src="/phone-front-home.png" alt="phones" width={298} height={540} />
          <Image src="/phone-front.png" alt="phone front" width={298} height={540} className='hidden xl:block'/>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default GetApp