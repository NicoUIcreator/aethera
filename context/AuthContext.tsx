import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import Constants from 'expo-constants';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuración para autenticación con Google
WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Configuración de Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
    androidClientId: Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: Constants.expoConfig?.extra?.GOOGLE_IOS_CLIENT_ID,
    webClientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
    redirectUri: makeRedirectUri({
      scheme: 'myapp'
    }),
  });

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Manejar la respuesta de autenticación de Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      handleGoogleToken(access_token);
    }
  }, [response]);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function handleGoogleToken(token: string) {
    try {
      setLoading(true);
      console.log('Iniciando autenticación con Google token...');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_token: token,
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        console.error('Error en autenticación con Google:', error.message);
        throw error;
      }
      
      console.log('Autenticación con Google exitosa');
      
      // Crear perfil de usuario si es la primera vez que inicia sesión
      if (data?.user) {
        console.log('Verificando perfil de usuario...');
        await createUserProfileIfNotExists(data.user.id);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  }
  
  async function signInWithGoogle() {
    try {
      console.log('Iniciando proceso de autenticación con Google...');
      const result = await promptAsync();
      
      if (result.type !== 'success') {
        console.log('Autenticación con Google cancelada o fallida:', result.type);
        // No lanzamos error si el usuario canceló la autenticación
        if (result.type === 'cancel') return;
        
        throw new Error(`Error en autenticación con Google: ${result.type}`);
      }
      
      console.log('Redirección de Google exitosa, procesando token...');
    } catch (error) {
      console.error('Error al iniciar autenticación con Google:', error);
      throw error;
    }
  }
  
  async function createUserProfileIfNotExists(userId: string) {
    try {
      console.log('Verificando si existe perfil para usuario:', userId);
      // Verificar si el perfil ya existe
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', userId)
        .single();
      
      // Si no existe, crear un nuevo perfil
      if (error || !data) {
        console.log('Perfil no encontrado, creando nuevo perfil...');
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([{ id: userId }]);
          
        if (insertError) {
          console.error('Error al insertar perfil de usuario:', insertError.message);
          throw insertError;
        }
        console.log('Perfil de usuario creado exitosamente');
      } else {
        console.log('Perfil de usuario ya existe');
      }
    } catch (error) {
      console.error('Error en la gestión del perfil de usuario:', error);
      // No lanzamos el error para evitar bloquear el flujo de autenticación
      // pero lo registramos para depuración
    }
  }
  
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}