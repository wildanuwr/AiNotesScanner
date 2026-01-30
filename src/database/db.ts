import { open } from 'react-native-quick-sqlite';

export const db = open({
  name: 'notes_scanner.db',
  location: 'default',
});
