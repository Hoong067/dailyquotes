import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import QuoteCard from '../components/QuoteCard';
import { useFavorites, usePremium } from '../hooks/useStorage';
import { COLORS } from '../constants/colors';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, isFavorite, loading } = useFavorites();
  const { isPremium } = usePremium();

  if (loading) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Saved Quotes</Text>
            <Text style={styles.subtitle}>
              {favorites.length} {favorites.length === 1 ? 'quote' : 'quotes'} saved
            </Text>
          </View>
          <View style={styles.heartIcon}>
            <Ionicons name="heart" size={24} color="#ff6b6b" />
          </View>
        </View>
      </SafeAreaView>

      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <QuoteCard
              quote={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              isPremium={isPremium}
            />
          )}
        />
      )}
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['rgba(102,126,234,0.15)', 'rgba(118,75,162,0.15)']}
        style={styles.emptyIcon}
      >
        <Ionicons name="heart-outline" size={48} color={COLORS.gradientStart} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>No saved quotes yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the ♥ icon on any quote to save it here for quick access
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  heartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,107,107,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.25)',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
