import { Platform } from 'react-native';

let Notifications = null;
try {
  Notifications = require('expo-notifications');
} catch (e) {
  console.warn('expo-notifications not available in this environment:', e.message);
}

let handlerConfigured = false;

export const initNotifications = async () => {
  if (handlerConfigured) return true;
  try {
    if (Notifications && typeof Notifications.setNotificationHandler === 'function') {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      handlerConfigured = true;
    }

    if (
      Platform.OS === 'android' &&
      Notifications &&
      typeof Notifications.setNotificationChannelAsync === 'function'
    ) {
      await Notifications.setNotificationChannelAsync('foodie_reminders', {
        name: 'Foodie Reminders',
        importance: Notifications.AndroidImportance?.MAX || 5,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#e63946',
      });
    }
    return true;
  } catch (err) {
    console.warn('Notifications init skipped or unsupported on this platform:', err.message);
    return false;
  }
};

export const requestNotificationPermissions = async () => {
  try {
    if (!Notifications || typeof Notifications.requestPermissionsAsync !== 'function') {
      return { granted: false, fallback: true };
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return { granted: finalStatus === 'granted', status: finalStatus };
  } catch (err) {
    console.warn('Notification permission error:', err.message);
    return { granted: false, fallback: true, error: err.message };
  }
};

export const scheduleTestNotification = async (delaySeconds = 2) => {
  await initNotifications();
  try {
    if (!Notifications || typeof Notifications.scheduleNotificationAsync !== 'function') {
      return { success: false, fallback: true, message: 'Time to cook something delicious!' };
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Foodie Reminder 🍳',
        body: 'Time to cook something delicious!',
        sound: true,
        data: { screen: 'Home' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL || 'timeInterval',
        seconds: Math.max(1, delaySeconds),
        repeats: false,
      },
    });

    return { success: true, notificationId: id };
  } catch (err) {
    console.warn('Schedule notification error:', err.message);
    return {
      success: false,
      fallback: true,
      message: 'Time to cook something delicious! (In-app notification)',
      error: err.message,
    };
  }
};

export const scheduleDailyReminder = async (delayMinutes = 1) => {
  await initNotifications();
  try {
    if (!Notifications || typeof Notifications.scheduleNotificationAsync !== 'function') {
      return { success: false, fallback: true };
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Foodie Inspiration 🍽️',
        body: 'Time to cook something delicious! Discover new recipes today.',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL || 'timeInterval',
        seconds: Math.max(10, delayMinutes * 60),
        repeats: true,
      },
    });

    return { success: true, notificationId: id };
  } catch (err) {
    console.warn('Daily reminder scheduling error:', err.message);
    return { success: false, fallback: true, error: err.message };
  }
};

export const cancelAllNotifications = async () => {
  try {
    if (Notifications && typeof Notifications.cancelAllScheduledNotificationsAsync === 'function') {
      await Notifications.cancelAllScheduledNotificationsAsync();
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Cancel notifications error:', err.message);
    return false;
  }
};
