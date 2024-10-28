'use client';

import { GoogleMap, MarkerF, useLoadScript, Circle, StandaloneSearchBox } from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { MapPin } from "lucide-react";
import { fetchItems } from "@/actions";

const Map = ({
    radius,
    setLatitude,
    style,
    address,
    setAddress,
    latitude,
    longitude,
    setLongitude,
}) => {

    const [map, setMap] = useState(null)
    const [establishments, setEstablishments] = useState(null)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries: ["places"]
    })

    const center = useMemo(() => ({  lat: latitude, lng: longitude }), [latitude, longitude])

    const changeCoordinate = (coord, index) => {
        const { latLng } = coord
        const lat = latLng.lat()
        const lng = latLng.lng()
        setLatitude(lat)
        setLongitude(lng)
    }

    useEffect(() => {
        map?.panTo({ lat: latitude, lng: longitude})
    }, [latitude, longitude])

    const inputRef = useRef(null)

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces()

        if(place) {
            setAddress(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
        }
    }

    useEffect(() => {
        const getEstablishments = async () => {
            const data = await fetchItems()

            setEstablishments(data)
        }

        getEstablishments()
    }, [])

  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
        <h2 className="bold-40 lg:bold-64 text-center">Encuentra</h2>
        <p className="regular-16 bg-white/80 text-gray-30 lg:bg-none mb-10 text-center">
        Utiliza nuestra herramienta de búsqueda para encontrar los establecimientos más cercanos a tu ubicación actual.
        </p>
        <div
            className="w-full h-[500px]"
        >
            {
                !isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={12}
                        onLoad={(map) => setMap(map)}
                    >
                        <StandaloneSearchBox
                            onLoad={(ref) => (inputRef.current = ref)}
                            onPlacesChanged={handlePlaceChanged}
                        >
                            <div
                                className="relative ml-48 mt-[10px] w-[500px]"
                            >
                                <input 
                                    type="text" 
                                    className={`form-control text-black rounded-lg bg-white ${style} pl-10`}
                                    value={address}
                                    placeholder="Buscar ubicacion"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </StandaloneSearchBox>

                        <button
                            className="z-50 flex justify-center items-center w-12 h-12 transition durtion-300 rounded-lg shadow-sm bg-white absolute left-[10px] bottom-[30px]"
                            onClick={() => map.panTo({ lat: latitude, lng: longitude })}
                        >
                            <span className="text-xs text-black">Centrar</span>
                        </button>

                        {
                            establishments?.map((establishment, index) => {
                                return (
                                    <MarkerF
                                        draggable
                                        animation={google.maps.Animation.DROP}
                                        onDragEnd={changeCoordinate}
                                        position={{ lat: parseFloat(establishment.latitude), lng: parseFloat(establishment.longitude) }}
                                    />
                                )
                            })
                        }
                        
                        <Circle
                            options={{
                                fillColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeColor: "#FF0000",
                                strokeWeight: 2,
                                fillOpacity: 0.35,
                            }}
                        />
                    </GoogleMap>
                )
            }
        </div>
    </section>
  )
}

export default Map