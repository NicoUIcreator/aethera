import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';

export default function RegisterScreen() {
  const { isDark } = useTheme();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=800&q=80' }}
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
          Crear Cuenta
        </Text>
        
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Únete a nuestra comunidad
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
            placeholder="Confirmar contraseña"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            { opacity: loading ? 0.7 : 1 }
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Text>
          {!loading && <ArrowRight size={20} color="#fff" />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={[styles.loginText, { color: isDark ? '#fff' : '#000' }]}>
            ¿Ya tienes una cuenta? Inicia sesión
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
  registerButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 8,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});