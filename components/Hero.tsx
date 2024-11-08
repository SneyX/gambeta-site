import Image from 'next/image'
import Button from './Button'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col py-10 md:gap-28 lg:py-20 xl:flex-row">

      <div className="relative z-20 flex flex-col xl:w-1/2 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Image 
            src="/icon-soccer.png"
            alt="soccer"
            width={50}
            height={50}
            className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
          />
        </motion.div>
        <motion.h1 
          className="bold-52 lg:bold-88"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Gambeta
        </motion.h1>
        <motion.p 
          className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          Gambeta es la aplicación perfecta para reservar canchas de deportes. Descubre y reserva canchas de fútbol, padel, tenis y más en tu ciudad. ¡Reserva tu espacio para jugar hoy mismo!
        </motion.p>


        <motion.div className="my-11 flex flex-col w-full gap-3 sm:flex-row"
          initial={{ x: '-150%' }}
          animate={{ x: '0' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}       
        >
          <Button 
              type="button"
              title="App Store"
              icon="/apple.svg"
              variant="border-black bg-white px-8 py-3 text-[#19bcc8] text-black"
              full
            />
          <Button 
            type="button"
            title="Play Store"
            icon="/android.svg"
            variant="btn_dark_green_outline"
            full
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ x: '200%' }}
        animate={{ x: '0' }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      >
        <Image
          src="/phone-left-hero.png"
          alt="phone"
          width={422}
          height={960}
          className="feature-phone"
        />
      </motion.div>
    </section>
  )
}

export default Hero