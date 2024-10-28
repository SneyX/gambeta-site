import Image from 'next/image'
import Button from './Button'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">

      <div className="relative z-20 flex flex-col xl:w-1/2 mt-20">
        <Image 
          src="/icon-soccer.png"
          alt="soccer"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 lg:bold-88">Gambeta</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Gambeta es la aplicación perfecta para reservar canchas de deportes. Descubre y reserva canchas de fútbol, padel, tenis y más en tu ciudad. ¡Reserva tu espacio para jugar hoy mismo!
        </p>


        <div className="my-11 flex flex-col w-full gap-3 sm:flex-row">
          <Button 
            type="button" 
            title="Descargar App" 
            variant="btn_green"
          />
        </div>
      </div>
      <Image
        src="/phone-left-hero.png"
        alt="phone"
        width={422}
        height={960}
        className="feature-phone"
      />
    </section>
  )
}

export default Hero