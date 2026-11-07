import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';
import { getAllStoredData, clearAllData, setItem, STORAGE_KEYS } from '../services/storage';

export default function StoredDataScreen() {
  const { colors, favorites, myRecipes, session, settings } = useApp();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    const result = await getAllStoredData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [favorites, myRecipes, session, settings]);

  const handleShare = async (key, jsonString) => {
    try {
      await Share.share({
        title: `Foodie Storage: ${key}`,
        message: `${key}:\n${jsonString}`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';
  const codeBg = colors?.isDarkMode ? '#000000' : '#1e293b';

  const keyMeta = {
    SESSION: { label: 'Active User Session', icon: 'key-outline', color: '#e63946' },
    USERS: { label: 'Registered Accounts', icon: 'people-outline', color: '#457b9d' },
    FAVORITES: { label: 'Saved Favorites IDs', icon: 'heart-outline', color: '#e63946' },
    MY_RECIPES: { label: 'User Created Recipes', icon: 'restaurant-outline', color: '#2a9d8f' },
    SETTINGS: { label: 'User Preferences', icon: 'settings-outline', color: '#e76f51' },
    API_CACHE: { label: 'TheMealDB Cache', icon: 'cloud-done-outline', color: '#3a86ff' },
  };

  return (
    <ScrollView style={[s.container, { backgroundColor: bgColor }]} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Overview Banner */}
      <View style={[s.banner, { backgroundColor: cardColor }]}>
        <View style={s.bannerRow}>
          <View style={s.bannerIconWrap}>
            <Ionicons name="server" size={28} color="#2a9d8f" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[s.bannerTitle, { color: textColor }]}>AsyncStorage Inspector</Text>
            <Text style={[s.bannerSub, { color: subtextColor }]}>
              Live dump of persistent offline storage for rubric verification
            </Text>
          </View>
        </View>

        <TouchableOpacity style={s.refreshBtn} onPress={loadData} disabled={loading}>
          <Ionicons name="refresh" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={s.refreshBtnText}>{loading ? 'Refreshing...' : 'Refresh Storage Dump'}</Text>
        </TouchableOpacity>
      </View>

      {/* Storage Items */}
      {loading ? (
        <View style={s.loader}>
          <ActivityIndicator size="large" color="#e63946" />
          <Text style={[s.loaderText, { color: subtextColor }]}>Reading AsyncStorage...</Text>
        </View>
      ) : (
        Object.entries(data).map(([keyName, item]) => {
          const meta = keyMeta[keyName] || {
            label: keyName,
            icon: 'document-text-outline',
            color: '#666',
          };
          const jsonDisplay = item.parsed !== null ? JSON.stringify(item.parsed, null, 2) : 'null (empty)';
          const count = Array.isArray(item.parsed)
            ? `${item.parsed.length} entries`
            : item.parsed
            ? '1 object'
            : 'empty';

          return (
            <View key={keyName} style={[s.keyCard, { backgroundColor: cardColor }]}>
              <View style={s.keyHeader}>
                <View style={[s.keyIconCircle, { backgroundColor: meta.color + '15' }]}>
                  <Ionicons name={meta.icon} size={20} color={meta.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[s.keyLabel, { color: textColor }]}>{meta.label}</Text>
                  <Text style={[s.keyStorageKey, { color: subtextColor }]}>
                    Key: <Text style={{ fontWeight: '700' }}>{item.key}</Text> • {count}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleShare(item.key, jsonDisplay)}
                  style={s.shareBtn}
                >
                  <Ionicons name="share-outline" size={18} color="#457b9d" />
                </TouchableOpacity>
              </View>

              <View style={[s.codeBlock, { backgroundColor: codeBg }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={s.codeText} selectable>
                    {jsonDisplay}
                  </Text>
                </ScrollView>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  banner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center' },
  bannerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f8f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: { fontSize: 18, fontWeight: '700' },
  bannerSub: { fontSize: 13, marginTop: 2 },
  refreshBtn: {
    backgroundColor: '#2a9d8f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14,
  },
  refreshBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  loader: { padding: 40, alignItems: 'center' },
  loaderText: { marginTop: 10, fontSize: 14 },
  keyCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  keyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  keyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyLabel: { fontSize: 16, fontWeight: '700' },
  keyStorageKey: { fontSize: 12, marginTop: 2 },
  shareBtn: { padding: 8 },
  codeBlock: {
    borderRadius: 10,
    padding: 12,
    maxHeight: 220,
  },
  codeText: {
    color: '#38bdf8',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});
