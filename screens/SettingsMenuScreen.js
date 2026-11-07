import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function SettingsMenuScreen({ navigation }) {
  const { session, logout, colors } = useApp();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'Profile & Preferences',
      subtitle: 'Manage account, dark mode & app info',
      icon: 'person-circle-outline',
      color: '#457b9d',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'notifications',
      title: 'Notification Center',
      subtitle: 'Reminders, daily cooking alerts & test triggers',
      icon: 'notifications-outline',
      color: '#e63946',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 'storedData',
      title: 'Stored Data Inspector',
      subtitle: 'Inspect raw JSON persisted in AsyncStorage',
      icon: 'server-outline',
      color: '#2a9d8f',
      onPress: () => navigation.navigate('StoredData'),
    },
  ];

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';

  return (
    <View style={[s.container, { backgroundColor: bgColor }]}>
      {session && (
        <View style={[s.userHeader, { backgroundColor: cardColor }]}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>
              {(session.username || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[s.userName, { color: textColor }]}>
              {session.username || 'Foodie Chef'}
            </Text>
            <Text style={[s.userEmail, { color: subtextColor }]}>
              {session.email || ''}
            </Text>
          </View>
        </View>
      )}

      <View style={[s.menuCard, { backgroundColor: cardColor }]}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            style={[
              s.itemRow,
              idx < menuItems.length - 1 && s.itemBorder,
              { borderColor: colors?.border || '#eee' },
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={[s.iconBox, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[s.itemTitle, { color: textColor }]}>{item.title}</Text>
              <Text style={[s.itemSubtitle, { color: subtextColor }]}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[s.logoutBtn, { backgroundColor: cardColor }]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={22} color="#d62828" style={{ marginRight: 8 }} />
        <Text style={s.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  userName: { fontSize: 18, fontWeight: '700' },
  userEmail: { fontSize: 13, marginTop: 2 },
  menuCard: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemSubtitle: { fontSize: 12, marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#ffcdd2',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#d62828',
    fontSize: 16,
    fontWeight: '700',
  },
});
