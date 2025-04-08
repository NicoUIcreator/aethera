import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react-native';

export default function LoginScreen() {
  const { isDark } = useTheme();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      // La redirección se maneja en el AuthContext después de una autenticación exitosa
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&w=800&q=80' }}
        style={styles.backgroundImage}
      />
      
      <Animated.View 
        entering={FadeInDown.duration(1000)}
        style={[
          styles.formContainer,
          { backgroundColor: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)' }
        ]}
      >
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Bienvenido a Aethera
        </Text>
        
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Inicia sesión para continuar
        </Text>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Mail size={20} color={isDark ? '#fff' : '#000'} />
          <TextInput
            style={[
              styles.input,
              { 
                color: isDark ? '#fff' : '#000',
                borderBottomColor: isDark ? '#333' : '#ddd'
              }
            ]}
            placeholder="Correo electrónico"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color={isDark ? '#fff' : '#000'} />
          <TextInput
            style={[
              styles.input,
              { 
                color: isDark ? '#fff' : '#000',
                borderBottomColor: isDark ? '#333' : '#ddd'
              }
            ]}
            placeholder="Contraseña"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { opacity: loading ? 0.7 : 1 }
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
          {!loading && <ArrowRight size={20} color="#fff" />}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#ddd' }]} />
          <Text style={[styles.dividerText, { color: isDark ? '#ccc' : '#666' }]}>O</Text>
          <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#ddd' }]} />
        </View>

        <TouchableOpacity
          style={[styles.googleButton, { opacity: googleLoading ? 0.7 : 1 }]}
          onPress={handleGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <LogIn size={20} color="#fff" />
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={[styles.registerText, { color: isDark ? '#fff' : '#000' }]}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 30,
  },
  errorText: {
    color: '#ff4444',
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  loginButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  registerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});