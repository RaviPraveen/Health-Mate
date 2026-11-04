import * as SQLite from 'expo-sqlite';

let database: Promise<SQLite.SQLiteDatabase> | null = null;

export function setupDatabase() {
    if (!database) {
        database = createDatabase().catch((error) => {
            database = null;
            throw error;
        });
    }

    return database;
}

async function createDatabase() {
    const db = await SQLite.openDatabaseAsync('healthmate.db');

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS health_records (
            id INTEGER PRIMARY KEY,
            date TEXT NOT NULL,
            steps INTEGER NOT NULL,
            calories INTEGER NOT NULL,
            water INTEGER NOT NULL
        );
    `);

    return db;
}
