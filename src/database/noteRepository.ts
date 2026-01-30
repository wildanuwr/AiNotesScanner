import { db } from './db';

export const insertNote = (content: string) => {
  db.execute(
    'INSERT INTO notes (content, created_at) VALUES (?, ?)',
    [content, new Date().toISOString()]
  );
};

export const getAllNotes = () => {
  const result = db.execute(
    'SELECT * FROM notes ORDER BY id DESC'
  );

  return result.rows?._array; // 👈 INI PENTING
};
