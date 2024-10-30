"use client"

import { handleAuthorizationCode } from "@/actions";
import Camp from "@/components/Camp";
import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import Map from "@/components/Map";
import { useState, useEffect } from "react";

export default function Home() {
  
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: null,
    longitude: null,
    radius: 500
  })

  const [latitude, setLatitude] = useState(-34.17054412214505)
  const [longitude, setLongitude] = useState(-58.956354125525024)
  const [address, setAddress] = useState("")
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      (async () => {
        try {
          const response = await handleAuthorizationCode(code, state);
          if (response.success) {
            alert(response.message);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error(error);
          alert('An unexpected error occurred. Please try again.');
        }
      })();
    }
  }, []);

  return (
    <>
      <Hero />
      <Camp />
      <Features />
      <Map
        address={address}
        setAddress={setAddress}
        radius={form.radius}
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        style="w-[50%] px-4 py-2 border-b-[1px] border-[#E5E5E3]"
      />
      <GetApp />
    </>
  )
}
