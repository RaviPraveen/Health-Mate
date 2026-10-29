
import * as SQLite from 'expo-sqlite';

export async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync('healthmate.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS health_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      steps INTEGER NOT NULL DEFAULT 0,
      calories INTEGER NOT NULL DEFAULT 0,
      water INTEGER NOT NULL DEFAULT 0
    );
  `);

  return db;
}
