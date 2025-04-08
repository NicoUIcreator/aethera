/*
  # Trigger para creación automática de perfiles de usuario

  1. Funcionalidad
    - Crear automáticamente un perfil de usuario cuando se registra un nuevo usuario en auth.users
    - Asegurar que todos los usuarios tengan un perfil asociado

  2. Implementación
    - Función que maneja la creación del perfil
    - Trigger que se activa cuando se crea un nuevo usuario en auth.users
*/

-- Función para manejar la creación automática de perfiles de usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar un nuevo perfil para el usuario recién creado
  INSERT INTO public.user_profiles (id, display_name, provider)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'provider'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar el trigger si ya existe para evitar duplicados
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Crear el trigger para ejecutar la función cuando se crea un nuevo usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar y crear perfiles para usuarios existentes que no tengan perfil
INSERT INTO public.user_profiles (id, display_name, provider)
SELECT 
  au.id, 
  COALESCE(au.raw_user_meta_data->>'name', au.email) as display_name,
  au.raw_user_meta_data->>'provider' as provider
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL;