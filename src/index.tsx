import { NativeModules, Platform, Linking } from 'react-native';

type WalletManagerType = {
  addPassFromFile(url: string): Promise<boolean>;
  hasPass(cardIdentifier: string, serialNumber?: string): Promise<boolean>;
};

const { WalletManager } = NativeModules;

export default {
  addPassFromFile:
    Platform.OS === 'ios'
      ? WalletManager.addPassFromFile
      : (url) => Linking.openURL(url),
  hasPass: async (cardIdentifier: string, serialNumber?: string) => {
    if (Platform.OS === 'android') {
      throw new Error('hasPass method not available on Android');
    }
    return await WalletManager.hasPass(
      cardIdentifier,
      serialNumber != null ? serialNumber : null
    );
  },
} as WalletManagerType;
