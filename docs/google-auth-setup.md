# Configuración de Autenticación con Google en Supabase

Este documento proporciona instrucciones detalladas para configurar la autenticación con Google en tu proyecto Supabase para la aplicación Aethera.

## 1. Crear un Proyecto en Google Cloud Platform

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el ID del proyecto, lo necesitarás más adelante

## 2. Configurar OAuth Consent Screen

1. En el menú lateral, ve a "APIs y Servicios" > "Pantalla de consentimiento de OAuth"
2. Selecciona el tipo de usuario (externo o interno)
3. Completa la información requerida:
   - Nombre de la aplicación: Aethera
   - Correo electrónico de soporte al usuario
   - Dominio autorizado (si tienes uno)
   - Información de contacto del desarrollador
4. Guarda y continúa

## 3. Crear Credenciales de OAuth

1. En el menú lateral, ve a "APIs y Servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "ID de cliente de OAuth"
3. Selecciona el tipo de aplicación:
   - Para Web: Selecciona "Aplicación web"
   - Para Android: Selecciona "Android"
   - Para iOS: Selecciona "iOS"

### Para Web

1. Nombre: Aethera Web
2. Orígenes autorizados de JavaScript:
   - `https://fcqqscqicgaibgdkzlil.supabase.co` (tu URL de Supabase)
   - `http://localhost:3000` (para desarrollo local)
   - `https://auth.expo.io` (para desarrollo con Expo)
3. URIs de redirección autorizados:
   - `https://fcqqscqicgaibgdkzlil.supabase.co/auth/v1/callback` (tu URL de Supabase)
   - `https://auth.expo.io/@tu_usuario_expo/aethera` (para desarrollo con Expo)

### Para Android

1. Nombre: Aethera Android
2. Nombre del paquete: `com.aethera.app` (debe coincidir con el package en app.json)
3. Huella digital SHA-1: Genera una huella digital para tu aplicación

### Para iOS

1. Nombre: Aethera iOS
2. ID del Bundle: `com.aethera.app` (debe coincidir con el bundleIdentifier en app.json)

## 4. Configurar Supabase

1. Ve a tu proyecto en [Supabase](https://app.supabase.io)
2. Navega a "Authentication" > "Providers"
3. Habilita el proveedor "Google"
4. Ingresa las credenciales:
   - Client ID: El ID de cliente que obtuviste de Google Cloud
   - Client Secret: El secreto de cliente que obtuviste de Google Cloud
5. Guarda la configuración

## 5. Actualizar app.json

Actualiza el archivo `app.json` con las credenciales obtenidas:

```json
"extra": {
  "SUPABASE_URL": "https://fcqqscqicgaibgdkzlil.supabase.co",
  "SUPABASE_ANON_KEY": "tu_clave_anonima_de_supabase",
  "GOOGLE_WEB_CLIENT_ID": "tu_client_id_web",
  "GOOGLE_ANDROID_CLIENT_ID": "tu_client_id_android",
  "GOOGLE_IOS_CLIENT_ID": "tu_client_id_ios"
}
```

## 6. Probar la Autenticación

1. Ejecuta la aplicación con `npm start`
2. Intenta iniciar sesión con Google
3. Verifica que el flujo de autenticación funcione correctamente

## Solución de Problemas

### Error de Redirección

Si recibes un error de redirección, asegúrate de que las URIs de redirección estén configuradas correctamente en Google Cloud y que coincidan con las que Supabase está utilizando.

### Error de Credenciales

Si las credenciales no funcionan, verifica que hayas copiado correctamente el ID de cliente y el secreto de cliente en la configuración de Supabase.

### Error en Dispositivos Móviles

Para Android, asegúrate de que la huella digital SHA-1 sea correcta.
Para iOS, asegúrate de que el ID del Bundle coincida con el configurado en Google Cloud.