import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { shareQuote, copyQuote } from '../utils/shareQuote';

const { width } = Dimensions.get('window');

const CARD_GRADIENTS = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#11998e', '#38ef7d'],
  ['#F7971E', '#FFD200'],
  ['#f953c6', '#b91d73'],
  ['#43cea2', '#185a9d'],
  ['#ff6a00', '#ee0979'],
];

function getGradient(quoteId) {
  const index = parseInt(quoteId.replace(/\D/g, ''), 10) % CARD_GRADIENTS.length;
  return CARD_GRADIENTS[index] || CARD_GRADIENTS[0];
}

export default function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  isPremium,
  onUnlockPress,
  style,
}) {
  const [copied, setCopied] = useState(false);
  const gradient = getGradient(quote.id);
  const isLocked = quote.premium && !isPremium;

  const handleShare = async () => {
    if (isLocked) { onUnlockPress?.(); return; }
    await shareQuote(quote);
  };

  const handleCopy = async () => {
    if (isLocked) { onUnlockPress?.(); return; }
    await copyQuote(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    if (isLocked) { onUnlockPress?.(); return; }
    onToggleFavorite(quote);
  };

  return (
    <LinearGradient
      colors={isLocked ? ['#2A2A4A', '#1A1A2E'] : gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, style]}
    >
      {/* Premium lock badge */}
      {isLocked && (
        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={12} color={COLORS.gold} />
          <Text style={styles.lockText}>PREMIUM</Text>
        </View>
      )}

      {/* Quote content */}
      <View style={styles.quoteContent}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={[styles.quoteText, isLocked && styles.lockedText]}>
          {isLocked ? quote.text.substring(0, 60) + '...\n\nUnlock to read more ✨' : quote.text}
        </Text>
        <View style={styles.authorRow}>
          <View style={styles.authorLine} />
          <Text style={[styles.authorText, isLocked && styles.lockedAuthor]}>
            {isLocked ? 'Premium Author' : quote.author}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleFavorite} activeOpacity={0.7}>
          <Ionicons
            name={isFavorite && !isLocked ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite && !isLocked ? '#ff6b6b' : 'rgba(255,255,255,0.8)'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleCopy} activeOpacity={0.7}>
          <Ionicons
            name={copied ? 'checkmark-circle' : 'copy-outline'}
            size={22}
            color={copied ? COLORS.success : 'rgba(255,255,255,0.8)'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={22} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        {isLocked && (
          <TouchableOpacity style={styles.unlockBtn} onPress={onUnlockPress} activeOpacity={0.7}>
            <Ionicons name="star" size={14} color={COLORS.background} />
            <Text style={styles.unlockText}>Unlock</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 28,
    minHeight: 240,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  lockText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  quoteContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  quoteMark: {
    fontSize: 64,
    color: 'rgba(255,255,255,0.25)',
    lineHeight: 50,
    fontWeight: '800',
    marginBottom: -8,
  },
  quoteText: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 28,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  lockedText: {
    color: 'rgba(255,255,255,0.5)',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  authorLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 1,
  },
  authorText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  lockedAuthor: {
    color: 'rgba(255,255,255,0.35)',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 'auto',
    gap: 5,
  },
  unlockText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 13,
  },
});
