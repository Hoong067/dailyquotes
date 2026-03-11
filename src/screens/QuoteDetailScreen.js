import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import QuoteCard from '../components/QuoteCard';
import { useFavorites, usePremium } from '../hooks/useStorage';
import { COLORS } from '../constants/colors';

const { height } = Dimensions.get('window');

export default function QuoteDetailScreen({ route }) {
  const navigation = useNavigation();
  const { quote } = route.params || {};
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isPremium } = usePremium();

  if (!quote) {
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.overlay}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.backdrop} onPress={() => navigation.goBack()} />
      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <LinearGradient
          colors={[COLORS.cardBg, COLORS.background]}
          style={styles.sheetContent}
        >
          {/* Handle bar */}
          <View style={styles.handle} />

          <QuoteCard
            quote={quote}
            isFavorite={isFavorite(quote.id)}
            onToggleFavorite={toggleFavorite}
            isPremium={isPremium}
            onUnlockPress={() => navigation.navigate('Premium')}
            style={styles.detailCard}
          />

          {/* Category chip */}
          <View style={styles.metaRow}>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>#{quote.category}</Text>
            </View>
            {quote.premium && !isPremium && (
              <TouchableOpacity
                style={styles.premiumChip}
                onPress={() => navigation.navigate('Premium')}
              >
                <Ionicons name="star" size={12} color={COLORS.gold} />
                <Text style={styles.premiumChipText}>Premium Quote</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  sheetContent: {
    padding: 20,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailCard: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: 'rgba(102,126,234,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(102,126,234,0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  categoryText: {
    color: COLORS.gradientStart,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  premiumChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  premiumChipText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '600',
  },
  closeBtn: {
    backgroundColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeBtnText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
