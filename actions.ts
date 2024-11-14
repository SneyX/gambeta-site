"use server"

import { createClient } from "@supabase/supabase-js";
import * as crypto from 'crypto';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

export const fetchItems = async () => {
    try {
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

      const encryptedAccessToken = encryptValue(access_token).encrypted
      const encryptedRefreshToken = encryptValue(refresh_token).encrypted
      const encryptedPublicKey = encryptValue(public_key).encrypted

      // Check if the establishment with the given state has MP credentials
      let { data: establishmentData, error: establishmentError } = await supabase
        .from('establishments')
        .select('mp_access_token, mp_refresh_token, mp_public_key')
        .eq('id', state)
        .single()

      if (establishmentError) throw establishmentError;

      // If the establishment does not have MP credentials, insert them
      if (establishmentData) {
        await supabase
          .from('establishments')
          .update({
            mp_access_token: encryptedAccessToken,
            mp_refresh_token: encryptedRefreshToken,
            mp_public_key: encryptedPublicKey
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

  // Función para encriptar un valor
  function encryptValue(value: string): any {
    // Genera una clave aleatoria de 32 bytes y la convierte a base64, esta clave se utilizará para encriptar el valor
    const key_string = process.env.ENCRYPTION_KEY as string
    // Genera un vector de inicialización aleatorio de 16 bytes y lo convierte a base64, este vector se utiliza para inicializar el algoritmo de encriptación y evitar ataques de prefijo común
    const iv_string = process.env.ENCRYPTION_IV as string

    // Convierte las cadenas de clave y vector de inicialización de base64 a Buffer, para que puedan ser utilizadas por el algoritmo de encriptación
    const key = Buffer.from(key_string, 'base64');
    const iv = Buffer.from(iv_string, 'base64');

    // Crea un cifrador AES-256-CBC con la clave y el vector de inicialización, este algoritmo es un estándar para encriptación simétrica
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    // Encripta el valor y lo devuelve en base64, el resultado es un string encriptado que no puede ser leído sin la clave y el vector de inicialización
    let encrypted = cipher.update(value, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Retorna el valor encriptado, la clave y el vector de inicialización, estos valores son necesarios para desencriptar el valor en el futuro
    return {
      encrypted,
      key: key.toString('base64'),
      iv: iv.toString('base64')
    };
  }

  // Función para desencriptar un valor
  function decryptValue(encryptedValue: string, key_string: string, iv_string: string): string {
    // Convierte las cadenas de clave y vector de inicialización de base64 a Buffer, para que puedan ser utilizadas por el algoritmo de desencriptación
    const key = Buffer.from(key_string, 'base64');
    const iv = Buffer.from(iv_string, 'base64');

    // Crea un desencriptador AES-256-CBC con la clave y el vector de inicialización, este algoritmo es el inverso del utilizado para encriptar
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // Desencripta el valor encriptado y lo devuelve en utf8, el resultado es el valor original que se encriptó
    let decrypted = decipher.update(encryptedValue, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    // Retorna el valor desencriptado
    return decrypted;
  }