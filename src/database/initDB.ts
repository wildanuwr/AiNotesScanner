import { db } from './db';

export const initDB = () => {
  db.execute(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      created_at TEXT
    );
  `);
};
