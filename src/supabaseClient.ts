import { createClient } from '@supabase/supabase-js';
import { App } from '@capacitor/app'; 
import { Preferences } from '@capacitor/preferences'; 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      async getItem(key) {
        const { value } = await Preferences.get({ key });
        return value;
      },
      async setItem(key, value) {
        await Preferences.set({ key, value });
      },
      async removeItem(key) {
        await Preferences.remove({ key });
      },
    },
    autoRefreshToken: true, 
    persistSession: true, 
    detectSessionInUrl: false, 
  },
});

// Manejo del ciclo de vida de la aplicación para actualización automática del token
App.addListener('appStateChange', ({ isActive }) => {
  if (isActive) {
    // Iniciar la actualización automática del token cuando la app está activa
    supabase.auth.startAutoRefresh();
  } else {
    // Detener la actualización automática del token cuando la app está en segundo plano
    supabase.auth.stopAutoRefresh();
  }
});