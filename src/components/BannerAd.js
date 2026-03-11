import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * BannerAd component.
 *
 * In production with EAS Build (bare workflow or expo-dev-client):
 *   - Replace the placeholder View with <BannerAd> from react-native-google-mobile-ads
 *   - Pass adUnitId from src/constants/admob.js
 *
 * react-native-google-mobile-ads requires native code and will NOT work with
 * Expo Go. Build with `eas build` or eject first.
 *
 * Example production code (uncomment after ejecting / using EAS):
 *
 *   import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
 *   import { AD_UNIT_IDS, USE_TEST_ADS } from '../constants/admob';
 *
 *   const adUnitId = USE_TEST_ADS ? TestIds.BANNER : AD_UNIT_IDS.banner;
 *
 *   return (
 *     <View style={styles.container}>
 *       <BannerAd
 *         unitId={adUnitId}
 *         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
 *         requestOptions={{ requestNonPersonalizedAdsOnly: true }}
 *       />
 *     </View>
 *   );
 */
export default function BannerAd({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>AD PLACEHOLDER</Text>
      <Text style={styles.sublabel}>Replace with AdMob BannerAd after EAS build</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sublabel: {
    color: COLORS.textMuted,
    fontSize: 9,
    marginTop: 2,
    opacity: 0.7,
  },
});
