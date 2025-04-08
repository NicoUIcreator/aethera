import { Tabs } from 'expo-router';
import { Heart, Book, User, Settings, Moon, Sun } from 'lucide-react-native';
import { useColorScheme, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function TabLayout() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        },
        headerTitleStyle: {
          fontFamily: 'Playfair-Bold',
          color: isDark ? '#ffffff' : '#1a1a1a',
        },
        headerRight: () => (
          <Animated.View entering={FadeIn}>
            <TouchableOpacity 
              onPress={toggleTheme}
              style={{ marginRight: 15 }}
            >
              {isDark ? (
                <Sun size={24} color="#FFD700" />
              ) : (
                <Moon size={24} color="#4A5568" />
              )}
            </TouchableOpacity>
          </Animated.View>
        ),
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderTopColor: isDark ? '#333333' : '#e5e5e5',
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="advice"
        options={{
          title: t('advice'),
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}