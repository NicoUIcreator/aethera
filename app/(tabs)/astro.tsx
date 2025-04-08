import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AstroScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Astrological Profile
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Cosmic insights for deeper understanding
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.astroCard}>
        <Text style={styles.astroTitle}>Daily Transit</Text>
        <Text style={styles.astroText}>
          Moon in Pisces
        </Text>
        <Text style={styles.astroDescription}>
          Your emotional sensitivity is heightened today. Use this intuitive energy for deep emotional connections.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  astroCard: {
    backgroundColor: '#4B0082',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  astroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  astroText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  astroDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});