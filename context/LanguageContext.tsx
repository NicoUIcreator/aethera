import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type Language = 'en' | 'es' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Aethera',
      advice: 'Relationship Advice',
      profile: 'Profile',
      settings: 'Settings',
      darkMode: 'Dark Mode',
      language: 'Language',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Aethera',
      advice: 'Consejos de Relación',
      profile: 'Perfil',
      settings: 'Configuración',
      darkMode: 'Modo Oscuro',
      language: 'Idioma',
    },
  },
  it: {
    translation: {
      welcome: 'Benvenuto su Aethera',
      advice: 'Consigli di Relazione',
      profile: 'Profilo',
      settings: 'Impostazioni',
      darkMode: 'Modalità Scura',
      language: 'Lingua',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  async function loadLanguage() {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage as Language);
        i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  }

  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      setLanguageState(newLanguage);
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}