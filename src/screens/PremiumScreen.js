import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePremium } from '../hooks/useStorage';
import { COLORS } from '../constants/colors';
import { PREMIUM_QUOTES } from '../data/quotes';

const FEATURES = [
  { icon: 'star', label: `${PREMIUM_QUOTES.length}+ Premium Quotes`, desc: 'Exclusive quotes from iconic leaders' },
  { icon: 'ban', label: 'Ad-Free Experience', desc: 'No interruptions, ever' },
  { icon: 'grid', label: 'All Quote Packs', desc: 'Wisdom, Love, Courage & more' },
  { icon: 'download', label: 'Daily Downloads', desc: 'Save quotes as beautiful images' },
  { icon: 'notifications', label: 'Daily Reminders', desc: 'Personalized motivation at your time' },
  { icon: 'infinite', label: 'Future Updates Free', desc: 'All new packs included forever' },
];

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$1.99',
    period: '/month',
    badge: null,
    gradient: ['#2A2A4A', '#1A1A2E'],
  },
  {
    id: 'yearly',
    label: 'Yearly',
    price: '$9.99',
    period: '/year',
    badge: '🔥 Best Value',
    gradient: ['#667eea', '#764ba2'],
    savings: 'Save 58%',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    price: '$19.99',
    period: 'one-time',
    badge: null,
    gradient: ['#F7971E', '#FFD200'],
  },
];

export default function PremiumScreen() {
  const { isPremium, unlockPremium } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    /**
     * TODO: Integrate expo-in-app-purchases or react-native-iap here.
     *
     * Steps:
     * 1. Set up your app on Google Play Console
     * 2. Create in-app products matching the plan IDs above
     * 3. Call InAppPurchases.purchaseItemAsync(productId)
     * 4. Verify the purchase with your backend (or use Google's RTDN)
     * 5. On success, call unlockPremium()
     *
     * For now, we simulate a successful purchase after a short delay.
     */
    await new Promise((r) => setTimeout(r, 1500));
    await unlockPremium();
    setLoading(false);

    Alert.alert(
      '🎉 Welcome to Premium!',
      'You now have access to all premium quotes and features.',
      [{ text: 'Awesome!', style: 'default' }]
    );
  };

  if (isPremium) {
    return <AlreadyPremium />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Hero section */}
      <LinearGradient colors={['#667eea', '#764ba2', '#0F0F1A']} style={styles.hero}>
        <SafeAreaView edges={['top']}>
          <View style={styles.heroContent}>
            <View style={styles.crownContainer}>
              <Text style={styles.crown}>👑</Text>
            </View>
            <Text style={styles.heroTitle}>Go Premium</Text>
            <Text style={styles.heroSubtitle}>
              Unlock all quotes, go ad-free, and get daily inspiration delivered to you.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Features list */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Everything included</Text>
        {FEATURES.map((f) => (
          <View key={f.icon} style={styles.featureRow}>
            <View style={styles.featureIconBg}>
              <Ionicons name={f.icon} size={18} color={COLORS.gradientStart} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          </View>
        ))}
      </View>

      {/* Plan selector */}
      <View style={styles.plansSection}>
        <Text style={styles.sectionTitle}>Choose your plan</Text>
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isSelected ? plan.gradient : ['#1A1A2E', '#1A1A2E']}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.planLeft}>
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  {plan.badge && (
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>{plan.badge}</Text>
                    </View>
                  )}
                  {plan.savings && isSelected && (
                    <Text style={styles.planSavings}>{plan.savings}</Text>
                  )}
                </View>
                <View style={styles.planRight}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
                {isSelected && (
                  <View style={styles.planCheck}>
                    <Ionicons name="checkmark-circle" size={22} color="#fff" />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CTA Button */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handlePurchase}
          disabled={loading}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="star" size={18} color="#fff" />
                <Text style={styles.ctaText}>Start Premium Now</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.legalText}>
          Subscription auto-renews unless cancelled. Cancel anytime.{'\n'}
          Payment charged to your Google Play account.
        </Text>

        <TouchableOpacity style={styles.restoreBtn}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function AlreadyPremium() {
  return (
    <View style={styles.alreadyContainer}>
      <SafeAreaView edges={['top']}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.alreadyHero}>
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.alreadyTitle}>You're Premium!</Text>
          <Text style={styles.alreadySubtitle}>
            All quotes and features are unlocked. Enjoy your daily inspiration!
          </Text>
        </LinearGradient>
      </SafeAreaView>
      <View style={styles.alreadyFeatures}>
        {FEATURES.map((f) => (
          <View key={f.icon} style={styles.featureRow}>
            <View style={styles.featureIconBg}>
              <Ionicons name={f.icon} size={18} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.featureLabel}>{f.label}</Text>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    paddingBottom: 40,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  crownContainer: {
    marginBottom: 12,
  },
  crown: {
    fontSize: 56,
    textAlign: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    padding: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  featureIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102,126,234,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(102,126,234,0.25)',
  },
  featureText: {
    flex: 1,
  },
  featureLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  featureDesc: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 1,
  },
  plansSection: {
    padding: 20,
    paddingTop: 4,
    gap: 12,
  },
  planCard: {
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: 'transparent',
  },
  planLeft: {
    flex: 1,
  },
  planLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  planBadge: {
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  planBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  planSavings: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  planPeriod: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  planCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  ctaSection: {
    padding: 20,
    paddingTop: 4,
    paddingBottom: 40,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.gradientStart,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  legalText: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 17,
  },
  restoreBtn: {
    marginTop: 10,
    padding: 8,
  },
  restoreText: {
    color: COLORS.gradientStart,
    fontSize: 13,
    fontWeight: '600',
  },
  // Already premium
  alreadyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  alreadyHero: {
    padding: 32,
    alignItems: 'center',
  },
  alreadyTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },
  alreadySubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  alreadyFeatures: {
    padding: 24,
  },
});
