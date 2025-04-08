# Aethera

## Descripción

Aethera es una aplicación móvil desarrollada con React Native y Expo que proporciona consejos y herramientas para relaciones personales.

## Características

- Autenticación de usuarios (email/contraseña y Google)
  - Inicio de sesión con email y contraseña
  - Inicio de sesión con Google OAuth
  - Creación automática de perfiles de usuario
- Perfiles de usuario personalizados
- Almacenamiento de información personal
- Interfaz adaptable (tema claro/oscuro)

## Configuración

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI
- Cuenta en Supabase
- Proyecto en Google Cloud Platform (para autenticación con Google)

### Autenticación con Google

Para configurar la autenticación con Google, consulta la guía detallada en [docs/google-auth-setup.md](./docs/google-auth-setup.md).

### Solución de Problemas de Autenticación

Si encuentras problemas con la autenticación, consulta nuestra guía de solución de problemas en [docs/auth-troubleshooting.md](./docs/auth-troubleshooting.md).

### Variables de Entorno

La aplicación utiliza las siguientes variables de entorno que deben configurarse en el archivo `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```