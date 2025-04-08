import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Heart, MessageCircle, BookOpen } from 'lucide-react-native';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=800&q=80' }}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            {t('Welcome to Aethera')}
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
            {t('Your journey to deeper connections starts here')}
          </Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.featuresContainer}>
        <TouchableOpacity 
          style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
        >
          <Heart size={32} color="#FF69B4" />
          <Text style={[styles.featureTitle, { color: isDark ? '#fff' : '#000' }]}>
            {t('Daily Insights')}
          </Text>
          <Text style={[styles.featureDescription, { color: isDark ? '#ccc' : '#666' }]}>
            {t('Discover new perspectives on love and relationships')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
        >
          <MessageCircle size={32} color="#4B0082" />
          <Text style={[styles.featureTitle, { color: isDark ? '#fff' : '#000' }]}>
            {t('Communication Tools')}
          </Text>
          <Text style={[styles.featureDescription, { color: isDark ? '#ccc' : '#666' }]}>
            {t('Learn effective ways to express yourself')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
        >
          <BookOpen size={32} color="#8B5CF6" />
          <Text style={[styles.featureTitle, { color: isDark ? '#fff' : '#000' }]}>
            {t('Relationship Guide')}
          </Text>
          <Text style={[styles.featureDescription, { color: isDark ? '#ccc' : '#666' }]}>
            {t('Expert advice for every stage of your journey')}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(600)}
        style={[styles.quoteCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
      >
        <Text style={[styles.quote, { color: isDark ? '#fff' : '#000' }]}>
          "The best relationships are built on a foundation of open communication and mutual understanding."
        </Text>
        <Text style={[styles.quoteAuthor, { color: isDark ? '#ccc' : '#666' }]}>
          — Relationship Expert
        </Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  headerContent: {
    padding: 20,
    marginTop: -60,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
  },
  featuresContainer: {
    padding: 20,
    gap: 20,
  },
  featureCard: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  quoteCard: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quote: {
    fontFamily: 'Playfair-Regular',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});