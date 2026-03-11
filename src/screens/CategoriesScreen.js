import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import QuoteCard from '../components/QuoteCard';
import BannerAd from '../components/BannerAd';
import { ALL_QUOTES, CATEGORIES } from '../data/quotes';
import { useFavorites, usePremium } from '../hooks/useStorage';
import { COLORS } from '../constants/colors';

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isPremium } = usePremium();

  const filteredQuotes = useMemo(() => {
    if (selectedCategory === 'all') return ALL_QUOTES;
    return ALL_QUOTES.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const handleUnlockPress = () => navigation.navigate('Premium');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Browse</Text>
          <Text style={styles.subtitle}>{filteredQuotes.length} quotes</Text>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipEmoji}>{cat.emoji}</Text>
                <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Quotes list */}
      <FlatList
        data={filteredQuotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <QuoteCard
            quote={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            isPremium={isPremium}
            onUnlockPress={handleUnlockPress}
          />
        )}
        ListFooterComponent={<View style={{ height: 16 }} />}
      />

      <BannerAd />
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 5,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: 'rgba(102,126,234,0.2)',
    borderColor: COLORS.gradientStart,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  chipLabelActive: {
    color: COLORS.gradientStart,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
});
