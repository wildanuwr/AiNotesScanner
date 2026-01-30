import NetInfo from "@react-native-community/netinfo";

type NetworkCallback = (isConnected: boolean) => void;

let unsubscribe: (() => void) | null = null;

/**
 * Register network broadcast listener
 */
export const registerNetworkListener = (callback: NetworkCallback) => {
  unsubscribe = NetInfo.addEventListener((state) => {
    callback(!!state.isConnected);
  });
};

/**
 * Unregister listener
 */
export const unregisterNetworkListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};
