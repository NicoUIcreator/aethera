import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function CycleScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Cycle Tracking
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Monitor your patterns and rhythms
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.cycleCard}>
        <Text style={styles.cycleTitle}>Current Phase</Text>
        <Text style={styles.cycleText}>Follicular Phase</Text>
        <Text style={styles.cycleDescription}>
          This is a time of renewal and increasing energy. Focus on starting new projects and setting intentions.
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
  cycleCard: {
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cycleTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cycleText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  cycleDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});