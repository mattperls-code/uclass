import { createClient } from "@supabase/supabase-js"
import 'react-native-url-polyfill/auto'

import AsyncStorage from "@react-native-async-storage/async-storage"

const supabaseUrl = process.env.REACT_NATIVE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_NATIVE_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
})

export default supabase