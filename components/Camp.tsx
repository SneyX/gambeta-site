"use client"

import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const CampSite = ({ backgroundImage, title, subtitle }: CampProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`h-full w-full min-w-[1100px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}
    >
     <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
      <div className="flexCenter gap-4">
        <div className="rounded-full bg-[#19bcc8] p-4">
          <Image
            src="/folded-map.svg"
            alt="map"
            width={28}
            height={28}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="bold-18 text-white">{title}</h4>
          <p className="regular-14 text-white">{subtitle}</p>
        </div>
      </div>
     </div>
    </motion.div>
  )
}

const Camp = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20" id="camp"
    >
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <CampSite 
          backgroundImage="bg-bg-img-1"
          title="Predio Ariel Rosada"
          subtitle="Campana, Buenos Aires"
        />
        <CampSite 
          backgroundImage="bg-bg-img-2"
          title="El Clasico"
          subtitle="Campana, Buenos Aires"
        />
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#19bcc8] p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl"
        >
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            <strong>Juega sin preocupaciones</strong>
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
            En Gambeta, nos aseguramos de que encuentres la cancha perfecta para ti y tus amigos. ¡Reserva ahora y disfruta del juego!
          </p>
          <Image 
            src="/quote.svg"
            alt="camp-2"
            width={186}
            height={219}
            className="camp-quote"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Camp