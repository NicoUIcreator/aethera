import { View, Text, StyleSheet, Switch, useColorScheme } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Settings
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Customize your experience
        </Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(400)} 
        style={[styles.settingsCard, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
      >
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Notifications
          </Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Daily Insights
          </Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Data Sync
          </Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
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
  settingsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});