# Solución de Problemas de Autenticación

Este documento proporciona soluciones para los problemas más comunes relacionados con la autenticación en la aplicación Aethera.

## Problemas con la Autenticación de Google

### Las credenciales de Google no están configuradas

**Síntoma**: Al intentar iniciar sesión con Google, aparece un error o la autenticación falla silenciosamente.

**Solución**:

1. Verifica que has configurado correctamente las credenciales de Google en tu archivo `.env` o `app.json`:
   ```
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=tu_client_id_web
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=tu_client_id_android
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=tu_client_id_ios
   ```

2. Asegúrate de haber creado un proyecto en Google Cloud Console y configurado las credenciales OAuth correctamente siguiendo las instrucciones en `docs/google-auth-setup.md`.

3. Verifica que las URIs de redirección en Google Cloud Console coincidan con las que Supabase está utilizando.

### Error de redirección

**Síntoma**: Después de autenticarse con Google, recibes un error de redirección.

**Solución**:

1. Verifica que las URIs de redirección en Google Cloud Console incluyan:
   - `https://fcqqscqicgaibgdkzlil.supabase.co/auth/v1/callback`
   - `https://auth.expo.io/@tu_usuario_expo/aethera` (para desarrollo con Expo)

2. Asegúrate de que el esquema de la aplicación en `app.json` coincida con el configurado en Expo:
   ```json
   "scheme": "myapp"
   ```

## Problemas con la Creación de Perfiles de Usuario

### El perfil de usuario no se crea automáticamente

**Síntoma**: Después de registrarte, no puedes acceder a tu perfil o aparecen errores relacionados con datos faltantes.

**Solución**:

1. Verifica que el trigger `on_auth_user_created` esté correctamente instalado en la base de datos. Este trigger debería crear automáticamente un perfil de usuario cuando te registras.

2. Ejecuta la migración `20250408062007_auth_triggers.sql` si no lo has hecho:
   ```sql
   -- Desde la consola SQL de Supabase
   \i 20250408062007_auth_triggers.sql
   ```

3. Si el problema persiste, puedes crear manualmente tu perfil de usuario:
   ```sql
   INSERT INTO public.user_profiles (id, display_name)
   VALUES ('tu-user-id', 'Tu Nombre');
   ```

## Problemas con el Inicio de Sesión con Email/Contraseña

### No puedo iniciar sesión con mi email y contraseña

**Síntoma**: Al intentar iniciar sesión con email y contraseña, recibes un error de credenciales inválidas.

**Solución**:

1. Verifica que estás utilizando el email correcto y que la contraseña es la que estableciste al registrarte.

2. Si olvidaste tu contraseña, utiliza la función de recuperación de contraseña.

3. Asegúrate de que tu cuenta no esté bloqueada por demasiados intentos fallidos de inicio de sesión.

## Contacto para Soporte Adicional

Si continúas experimentando problemas con la autenticación después de intentar estas soluciones, contacta al equipo de soporte en support@aethera.app o abre un issue en el repositorio del proyecto.