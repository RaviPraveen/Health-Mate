import * as SQLite from 'expo-sqlite';

export async function setupDatabase() {
    const db = await SQLite.openDatabaseAsync('healthmate.db');

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL COLLATE NOCASE UNIQUE,
            password_hash TEXT NOT NULL,
            photo_uri TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

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
