/*
  # Actualización para autenticación y perfiles de usuario

  1. Actualizaciones
    - Asegurar que la tabla `user_profiles` esté vinculada correctamente con auth.users
    - Agregar campos adicionales para información de usuario
    - Configurar políticas RLS para acceso seguro

  2. Nuevos campos en user_profiles
    - `display_name` (text) - Nombre para mostrar del usuario
    - `avatar_url` (text) - URL de la imagen de perfil
    - `provider` (text) - Proveedor de autenticación (email, google, etc.)
*/

-- Asegurar que la tabla user_profiles existe
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  provider text,
  saved_advice jsonb[] DEFAULT '{}',
  personal_notes text[] DEFAULT '{}',
  relationship_goals text[] DEFAULT '{}',
  progress_tracking jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Asegurar que RLS está habilitado
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay para evitar duplicados
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Recrear políticas
-- Policy to allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);