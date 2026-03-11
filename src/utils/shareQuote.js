import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { Share, Platform } from 'react-native';

/**
 * Share a quote using the native share sheet.
 * Falls back to clipboard copy if sharing is unavailable.
 */
export async function shareQuote(quote) {
  const text = `"${quote.text}"\n— ${quote.author}\n\n✨ Daily Quotes App`;

  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      await Share.share({ message: text, title: 'Daily Quote' });
    } else if (await Sharing.isAvailableAsync()) {
      // Web fallback
      await Sharing.shareAsync(text);
    } else {
      await Clipboard.setStringAsync(text);
      return { copied: true };
    }
    return { shared: true };
  } catch (error) {
    // User dismissed the share sheet — not an error
    return { dismissed: true };
  }
}

/**
 * Copy quote text to clipboard.
 */
export async function copyQuote(quote) {
  const text = `"${quote.text}" — ${quote.author}`;
  await Clipboard.setStringAsync(text);
  return { copied: true };
}
