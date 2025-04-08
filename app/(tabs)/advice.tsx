import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';

interface AdviceCard {
  id: string;
  title: string;
  category: string;
  color: string;
  image: string;
  description: string;
  tips: string[];
}

const adviceData: AdviceCard[] = [
  {
    id: '1',
    title: 'Building Trust Through Communication',
    category: 'Communication',
    color: '#FF69B4',
    image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&w=800&q=80',
    description: 'Open and honest communication is the foundation of any strong relationship. Learn how to create a safe space for vulnerable conversations.',
    tips: [
      'Practice active listening without interrupting',
      'Share your feelings using "I" statements',
      'Set aside dedicated time for deep conversations',
    ],
  },
  {
    id: '2',
    title: 'Maintaining Individual Growth',
    category: 'Personal Development',
    color: '#4B0082',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    description: 'Growing individually while nurturing your relationship creates a balanced and fulfilling partnership.',
    tips: [
      'Pursue your personal interests and hobbies',
      'Support your partner\'s goals',
      'Share your achievements and growth with each other',
    ],
  },
];

export default function AdviceScreen() {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedAdvice, setSelectedAdvice] = useState<AdviceCard | null>(null);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          {t('Daily Wisdom')}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          {t('Insights for stronger relationships')}
        </Text>
      </Animated.View>

      {adviceData.map((advice, index) => (
        <Animated.View 
          key={advice.id}
          entering={FadeInUp.delay(300 + index * 100)}
          style={[
            styles.card,
            { backgroundColor: isDark ? '#1a1a1a' : '#fff' }
          ]}
        >
          <Image
            source={{ uri: advice.image }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <View style={[styles.categoryTag, { backgroundColor: advice.color }]}>
              <Text style={styles.categoryText}>{advice.category}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>
              {advice.title}
            </Text>
            <Text style={[styles.cardDescription, { color: isDark ? '#ccc' : '#666' }]}>
              {advice.description}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={20} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginTop: 20,
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
  card: {
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  cardTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  actionButton: {
    padding: 8,
  },
});