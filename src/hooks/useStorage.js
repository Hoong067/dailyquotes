import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@dailyquotes_favorites';
const PREMIUM_KEY = '@dailyquotes_premium';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.warn('Failed to load favorites', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = useCallback(async (quote) => {
    setFavorites((prev) => {
      const exists = prev.some((q) => q.id === quote.id);
      const updated = exists
        ? prev.filter((q) => q.id !== quote.id)
        : [...prev, quote];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (quoteId) => favorites.some((q) => q.id === quoteId),
    [favorites]
  );

  return { favorites, loading, toggleFavorite, isFavorite };
}

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PREMIUM_KEY).then((val) => {
      if (val === 'true') setIsPremium(true);
    });
  }, []);

  // Call this after a successful in-app purchase
  const unlockPremium = async () => {
    await AsyncStorage.setItem(PREMIUM_KEY, 'true');
    setIsPremium(true);
  };

  return { isPremium, unlockPremium };
}
