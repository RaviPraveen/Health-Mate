import { setupDatabase } from '../../database/database';

export type HealthRecord = {
    id: number;
    date: string;
    steps: number;
    calories: number;
    water: number;
};

export function getLocalDate(value = new Date()) {
    const year = String(value.getFullYear()).padStart(4, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function checkDate(date: string) {
    const day = new Date(`${date}T12:00:00`);

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(day.getTime()) ||
        getLocalDate(day) !== date
    ) {
        throw new Error('Please choose a valid date.');
    }
}

function readNumber(value: string, label: string) {
    const text = value.replace(/,/g, '').trim();
    const number = Number(text);

    if (
        !/^\d+$/.test(text) ||
        !Number.isSafeInteger(number) ||
        number < 0
    ) {
        throw new Error(`${label} must be a whole number, zero or greater.`);
    }

    return number;
}

export async function getHealthRecord(date: string) {
    checkDate(date);

    const db = await setupDatabase();

    return db.getFirstAsync<HealthRecord>(
        `SELECT id, date, steps, calories, water
         FROM health_records
         WHERE date = ?
         ORDER BY id DESC
         LIMIT 1`,
        date
    );
}

export async function saveHealthRecord(
    date: string,
    steps: string,
    calories: string,
    water: string
) {
    checkDate(date);

    const stepsValue = readNumber(steps, 'Steps');
    const caloriesValue = readNumber(calories, 'Calories');
    const waterValue = readNumber(water, 'Water');

    const db = await setupDatabase();

    await db.withExclusiveTransactionAsync(async (transaction) => {
        const record = await transaction.getFirstAsync<{ id: number }>(
            `SELECT id FROM health_records
             WHERE date = ?
             ORDER BY id DESC
             LIMIT 1`,
            date
        );

        if (record) {
            await transaction.runAsync(
                `UPDATE health_records
                 SET steps = ?, calories = ?, water = ?
                 WHERE id = ?`,
                stepsValue,
                caloriesValue,
                waterValue,
                record.id
            );
        } else {
            await transaction.runAsync(
                `INSERT INTO health_records (date, steps, calories, water)
                 VALUES (?, ?, ?, ?)`,
                date,
                stepsValue,
                caloriesValue,
                waterValue
            );
        }
    });
}
