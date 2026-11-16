import * as SQLite from 'expo-sqlite';


let databaseSetup: Promise<SQLite.SQLiteDatabase> | null = null;

export function setupDatabase() {
    if (databaseSetup === null) {
        databaseSetup = createDatabase().catch((error) => {
            databaseSetup = null;
            throw error;
        });
    }

    return databaseSetup;
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

        CREATE TABLE IF NOT EXISTS daily_goals (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            steps INTEGER NOT NULL CHECK (steps > 0),
            calories INTEGER NOT NULL CHECK (calories > 0),
            water INTEGER NOT NULL CHECK (water > 0)
        );
    `);

    return db;
}
