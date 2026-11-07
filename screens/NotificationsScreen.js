import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';
import {
  requestNotificationPermissions,
  scheduleTestNotification,
  scheduleDailyReminder,
  cancelAllNotifications,
} from '../services/notifications';

export default function NotificationsScreen() {
  const { settings, updateSettings, colors } = useApp();
  const [testing, setTesting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDelay, setSelectedDelay] = useState(settings.reminderMinutes || 1);

  const isEnabled = settings.notificationsEnabled !== false;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleToggle = async (val) => {
    updateSettings({ notificationsEnabled: val });
    if (val) {
      const res = await requestNotificationPermissions();
      if (!res.granted && !res.fallback) {
        showToast('Notification permission not granted. In-app alerts will be used.');
      } else {
        await scheduleDailyReminder(selectedDelay);
        showToast(`Reminders enabled! Active every ${selectedDelay} min.`);
      }
    } else {
      await cancelAllNotifications();
      showToast('Notifications disabled and schedules canceled.');
    }
  };

  const handleDelayChange = async (minutes) => {
    setSelectedDelay(minutes);
    updateSettings({ reminderMinutes: minutes });
    if (isEnabled) {
      await scheduleDailyReminder(minutes);
      showToast(`Reminder interval set to every ${minutes} minute(s).`);
    }
  };

  const handleTestNotification = async () => {
    setTesting(true);
    showToast('Scheduling notification... Triggering in 2 seconds!');
    const result = await scheduleTestNotification(2);

    setTimeout(() => {
      setTesting(false);
      if (result.success) {
        showToast('Notification fired! "Time to cook something delicious!"');
      } else {
        showToast('Local notification: "Time to cook something delicious!" 🍳');
      }
    }, 2200);
  };

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';

  return (
    <ScrollView style={[s.container, { backgroundColor: bgColor }]}>
      {/* Toast Notification Banner */}
      {!!toastMessage && (
        <View style={s.toast}>
          <Ionicons name="notifications" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={s.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Main Switch Card */}
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <View style={s.row}>
          <View style={s.iconWrap}>
            <Ionicons name="notifications-outline" size={26} color="#e63946" />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[s.cardTitle, { color: textColor }]}>Enable Notifications</Text>
            <Text style={[s.cardSubtitle, { color: subtextColor }]}>
              Receive scheduled alerts and meal ideas
            </Text>
          </View>
          <Switch
            value={isEnabled}
            onValueChange={handleToggle}
            trackColor={{ false: '#ccc', true: '#e63946' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Schedule / Delay Setting */}
      <Text style={[s.sectionTitle, { color: subtextColor }]}>REMINDER INTERVAL</Text>
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <Text style={[s.descText, { color: subtextColor }]}>
          Choose how often Foodie sends cooking reminders:
        </Text>
        <View style={s.delayRow}>
          {[1, 5, 15, 60].map((mins) => {
            const isSelected = selectedDelay === mins;
            return (
              <TouchableOpacity
                key={mins}
                style={[
                  s.delayBtn,
                  isSelected && s.delayBtnActive,
                  { borderColor: isSelected ? '#e63946' : '#ddd' },
                ]}
                onPress={() => handleDelayChange(mins)}
              >
                <Text
                  style={[
                    s.delayBtnText,
                    isSelected ? s.delayBtnTextActive : { color: textColor },
                  ]}
                >
                  {mins === 60 ? '1 Hour' : `${mins} min`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Test Trigger Button */}
      <Text style={[s.sectionTitle, { color: subtextColor }]}>TEST LOCAL NOTIFICATION</Text>
      <View style={[s.card, { backgroundColor: cardColor }]}>
        <Text style={[s.descText, { color: subtextColor }]}>
          Trigger an immediate 2-second countdown notification to verify system notification handler:
        </Text>

        <TouchableOpacity
          style={[s.testBtn, testing && { opacity: 0.7 }]}
          onPress={handleTestNotification}
          disabled={testing}
          activeOpacity={0.85}
        >
          <Ionicons
            name={testing ? 'hourglass-outline' : 'paper-plane-outline'}
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={s.testBtnText}>
            {testing ? 'Sending in 2s...' : 'Send Test Notification (2s)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notice Card for Web / Snack */}
      <View style={s.infoCard}>
        <Ionicons name="information-circle-outline" size={22} color="#457b9d" />
        <Text style={s.infoText}>
          Foodie uses `expo-notifications` local notification handlers. In web and Snack
          environments where push services are restricted, toast alerts gracefully demonstrate
          triggers without crashing.
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a9d8f',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  toastText: { color: '#fff', fontWeight: '600', fontSize: 14, flex: 1 },
  card: {
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSubtitle: { fontSize: 13, marginTop: 2 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 6,
    letterSpacing: 0.8,
  },
  descText: { fontSize: 14, marginBottom: 12, lineHeight: 20 },
  delayRow: { flexDirection: 'row', justifyContent: 'space-between' },
  delayBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  delayBtnActive: { backgroundColor: '#e63946' },
  delayBtnText: { fontSize: 14, fontWeight: '600' },
  delayBtnTextActive: { color: '#fff', fontWeight: '700' },
  testBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  testBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaf4f7',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  infoText: {
    color: '#264653',
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 8,
    flex: 1,
  },
});
