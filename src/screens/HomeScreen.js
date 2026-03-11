import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import QuoteCard from '../components/QuoteCard';
import BannerAd from '../components/BannerAd';
import { FREE_QUOTES, PREMIUM_QUOTES } from '../data/quotes';
import { useFavorites, usePremium } from '../hooks/useStorage';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

// Combine and shuffle quotes so premium teasers appear in the feed
const FEED_QUOTES = [
  ...FREE_QUOTES,
  ...PREMIUM_QUOTES.slice(0, 5), // show 5 premium teasers in feed
];

function getTodayQuote() {
  const day = new Date().getDate();
  return FREE_QUOTES[day % FREE_QUOTES.length];
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { isPremium } = usePremium();

  const todayQuote = getTodayQuote();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const handleUnlockPress = () => {
    navigation.navigate('Premium');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <SafeAreaView edges={['top']}>
        <LinearGradient
          colors={['#0F0F1A', 'transparent']}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <TouchableOpacity
            style={styles.premiumBadge}
            onPress={() => navigation.navigate('Premium')}
          >
            {isPremium ? (
              <>
                <Ionicons name="star" size={14} color={COLORS.gold} />
                <Text style={styles.premiumBadgeText}>PRO</Text>
              </>
            ) : (
              <>
                <Ionicons name="star-outline" size={14} color={COLORS.gold} />
                <Text style={styles.premiumBadgeText}>Upgrade</Text>
              </>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>

      {/* Quote of the Day banner */}
      <View style={styles.qotdContainer}>
        <View style={styles.qotdBadge}>
          <Ionicons name="sunny" size={13} color={COLORS.gold} />
          <Text style={styles.qotdLabel}>QUOTE OF THE DAY</Text>
        </View>
      </View>

      {/* Swipeable quote feed */}
      <FlatList
        ref={flatListRef}
        data={FEED_QUOTES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={styles.feedContainer}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <QuoteCard
              quote={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              isPremium={isPremium}
              onUnlockPress={handleUnlockPress}
            />
          </View>
        )}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {FEED_QUOTES.slice(0, 10).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex && styles.dotActive,
            ]}
          />
        ))}
        {FEED_QUOTES.length > 10 && (
          <Text style={styles.moreText}>+{FEED_QUOTES.length - 10}</Text>
        )}
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{FREE_QUOTES.length + PREMIUM_QUOTES.length}</Text>
          <Text style={styles.statLabel}>Total Quotes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{PREMIUM_QUOTES.length}</Text>
          <Text style={styles.statLabel}>Premium</Text>
        </View>
      </View>

      {/* Banner Ad */}
      <BannerAd />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  greeting: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dateText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  premiumBadgeText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
  },
  qotdContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  qotdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qotdLabel: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  feedContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: COLORS.gradientStart,
  },
  moreText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
});
