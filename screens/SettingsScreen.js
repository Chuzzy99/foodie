import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function SettingsScreen() {
  const { session, settings, updateSettings, colors, isDarkMode } = useApp();

  const toggleDarkMode = (value) => {
    updateSettings({ darkMode: value });
  };

  const toggleNotifications = (value) => {
    updateSettings({ notificationsEnabled: value });
  };

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';
  const borderColor = colors?.border || '#eeeeee';

  return (
    <ScrollView style={[s.container, { backgroundColor: bgColor }]}>
      {/* Account Info Section */}
      <Text style={[s.sectionHeader, { color: subtextColor }]}>USER ACCOUNT</Text>
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons name="person" size={20} color="#457b9d" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.rowLabel, { color: subtextColor }]}>Username</Text>
            <Text style={[s.rowValue, { color: textColor }]}>
              {session?.username || 'Guest User'}
            </Text>
          </View>
        </View>

        <View style={[s.separator, { backgroundColor: borderColor }]} />

        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons name="mail" size={20} color="#2a9d8f" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.rowLabel, { color: subtextColor }]}>Email Address</Text>
            <Text style={[s.rowValue, { color: textColor }]}>
              {session?.email || 'guest@foodie.local'}
            </Text>
          </View>
        </View>
      </View>

      {/* Preferences Section */}
      <Text style={[s.sectionHeader, { color: subtextColor }]}>PREFERENCES</Text>
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons
              name={isDarkMode ? 'moon' : 'sunny'}
              size={20}
              color={isDarkMode ? '#ffd166' : '#e63946'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.prefTitle, { color: textColor }]}>Dark Mode</Text>
            <Text style={[s.prefSub, { color: subtextColor }]}>
              {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
            </Text>
          </View>
          <Switch
            value={!!settings.darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#ccc', true: '#e63946' }}
            thumbColor="#fff"
          />
        </View>

        <View style={[s.separator, { backgroundColor: borderColor }]} />

        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons name="notifications" size={20} color="#e63946" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.prefTitle, { color: textColor }]}>Cooking Reminders</Text>
            <Text style={[s.prefSub, { color: subtextColor }]}>
              Receive daily meal suggestions
            </Text>
          </View>
          <Switch
            value={settings.notificationsEnabled !== false}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ccc', true: '#2a9d8f' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* About & Version Section */}
      <Text style={[s.sectionHeader, { color: subtextColor }]}>ABOUT FOODIE</Text>
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons name="information-circle" size={20} color="#457b9d" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.rowLabel, { color: subtextColor }]}>Application Version</Text>
            <Text style={[s.rowValue, { color: textColor }]}>v2.0.0 (Capstone Edition)</Text>
          </View>
        </View>

        <View style={[s.separator, { backgroundColor: borderColor }]} />

        <View style={s.row}>
          <View style={s.iconCircle}>
            <Ionicons name="code-slash" size={20} color="#e63946" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.rowLabel, { color: subtextColor }]}>Build Environment</Text>
            <Text style={[s.rowValue, { color: textColor }]}>Expo & React Native</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 6,
    letterSpacing: 0.8,
  },
  card: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { fontSize: 12, fontWeight: '500' },
  rowValue: { fontSize: 16, fontWeight: '600', marginTop: 2 },
  prefTitle: { fontSize: 15, fontWeight: '600' },
  prefSub: { fontSize: 12, marginTop: 2 },
  separator: { height: 1 },
});
