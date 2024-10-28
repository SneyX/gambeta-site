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