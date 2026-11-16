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
        Number.isNaN(day.getTime()) ||
        getLocalDate(day) !== date
    ) {
        throw new Error('Please choose a valid date.');
    }
}

function getNumberError(value: string, label: string) {
    const text = value.trim();

    if (text === '') {
        return `Enter ${label.toLowerCase()}.`;
    }

    const numberText = text.split(',').join('');
    const number = Number(numberText);

    if (numberText === '' || !Number.isFinite(number)) {
        return `${label} must contain numbers only.`;
    }

    if (number < 0) {
        return `${label} must be zero or greater.`;
    }

    if (!Number.isSafeInteger(number) || numberText.includes('.')) {
        return `${label} must be a whole number.`;
    }

    for (let i = 0; i < numberText.length; i++) {
        if (numberText[i] < '0' || numberText[i] > '9') {
            return `${label} must contain numbers only.`;
        }
    }

    if (text.includes(',') && text !== number.toLocaleString('en-US')) {
        return `${label} must be a valid whole number.`;
    }

    return '';
}

export function getHealthRecordErrors(steps: string, calories: string, water: string) {
    return {
        steps: getNumberError(steps, 'Steps'),
        calories: getNumberError(calories, 'Calories'),
        water: getNumberError(water, 'Water'),
    };
}

function readNumber(value: string, label: string) {
    const error = getNumberError(value, label);

    if (error !== '') {
        throw new Error(error);
    }

    return Number(value.split(',').join('').trim());
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

export async function getHealthRecords() {
    const db = await setupDatabase();

    return db.getAllAsync<HealthRecord>(
        `SELECT id, date, steps, calories, water
         FROM health_records
         ORDER BY date DESC, id DESC`
    );
}

export async function getHealthRecordById(id: number) {
    const db = await setupDatabase();

    return db.getFirstAsync<HealthRecord>(
        `SELECT id, date, steps, calories, water
         FROM health_records
         WHERE id = ?`,
        id
    );
}

export async function updateHealthRecord(
    id: number,
    steps: string,
    calories: string,
    water: string
) {
    const stepsValue = readNumber(steps, 'Steps');
    const caloriesValue = readNumber(calories, 'Calories');
    const waterValue = readNumber(water, 'Water');

    const db = await setupDatabase();

    const result = await db.runAsync(
        `UPDATE health_records
         SET steps = ?, calories = ?, water = ?
         WHERE id = ?`,
        stepsValue,
        caloriesValue,
        waterValue,
        id
    );

    if (result.changes === 0) {
        throw new Error('This record could not be found.');
    }
}

export async function deleteHealthRecord(id: number) {
    const db = await setupDatabase();
    const result = await db.runAsync(
        'DELETE FROM health_records WHERE id = ?',
        id
    );

    if (result.changes === 0) {
        throw new Error('This record could not be found.');
    }
}
