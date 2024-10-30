"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

export const fetchItems = async () => {
    try {
      console.log('fetching')
      let { data, error } = await supabase
      .from('establishments')
      .select(`
        name, latitude, longitude, address
      `)
      //.ilike('address', `%${location.address.city}%`)
      
      if (error) throw error;

      return data

    } catch (error) {
      console.error('Error fetching items:', error)

      return []
    }
  }

  export const handleAuthorizationCode = async (code: string, state: string) => {
    try {
      const requestBody = new URLSearchParams({
        client_secret: process.env.CLIENT_SECRET as string,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI as string
      });

      const response = await fetch('https://api.mercadopago.com/oauth/token', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: requestBody.toString()
      });

      if (!response.ok) {
        throw new Error("Tu código de autorización o token de refresco puede estar caducado o ya fue utilizado");
      }

      const data = await response.json();
      const { access_token, refresh_token, public_key } = data;

      // Check if the establishment with the given state has MP credentials
      let { data: establishmentData, error: establishmentError } = await supabase
        .from('establishments')
        .select('mp_access_token, mp_refresh_token, mp_public_key')
        .eq('id', state)
        .single()

      if (establishmentError) throw establishmentError;

      // If the establishment does not have MP credentials, insert them
      if (establishmentData && !establishmentData.mp_access_token) {
        await supabase
          .from('establishments')
          .update({
            mp_access_token: access_token,
            mp_refresh_token: refresh_token,
            mp_public_key: public_key
          })
          .eq('id', state);
        const popupData = {
          success: true,
          message: 'Autorización exitosa. Tu establecimiento ahora está conectado a Mercado Pago.'
        };
        return popupData;
      } else {
        // If the establishment already has MP credentials, show a message indicating this
        const popupData = {
          success: true,
          message: 'Tu establecimiento ya tiene credenciales de Mercado Pago. No se requiere acción adicional.'
        };
        return popupData;
      }
    } catch (error: any) {
      const popupData = {
        success: false,
        message: error.message
      };
      return popupData;
    }
  }