import { setupDatabase } from '../../database/database';

export type DailyGoals = {
    steps: number;
    calories: number;
    water: number;
};

function getGoalError(value: string, label: string) {
    const text = value.trim();

    if (text === '') {
        return `Enter your ${label.toLowerCase()}.`;
    }

    const numberText = text.split(',').join('');
    const number = Number(numberText);

    if (numberText === '' || !Number.isFinite(number)) {
        return `${label} must contain numbers only.`;
    }

    if (number <= 0) {
        return `${label} must be greater than zero.`;
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

export function getGoalErrors(steps: string, calories: string, water: string) {
    return {
        steps: getGoalError(steps, 'Step goal'),
        calories: getGoalError(calories, 'Calorie goal'),
        water: getGoalError(water, 'Water goal'),
    };
}

export async function getGoals() {
    const db = await setupDatabase();
    const goals = await db.getFirstAsync<DailyGoals>(
        'SELECT steps, calories, water FROM daily_goals WHERE id = 1'
    );

    return goals;
}

export async function saveGoals(steps: string, calories: string, water: string) {
    const errors = getGoalErrors(steps, calories, water);

    if (errors.steps !== '') {
        throw new Error(errors.steps);
    }

    if (errors.calories !== '') {
        throw new Error(errors.calories);
    }

    if (errors.water !== '') {
        throw new Error(errors.water);
    }

    const stepsValue = Number(steps.split(',').join(''));
    const caloriesValue = Number(calories.split(',').join(''));
    const waterValue = Number(water.split(',').join(''));
    const db = await setupDatabase();

    await db.withExclusiveTransactionAsync(async (transaction) => {
        const goals = await transaction.getFirstAsync(
            'SELECT id FROM daily_goals WHERE id = 1'
        );

        if (goals) {
            await transaction.runAsync(
                `UPDATE daily_goals SET steps = ?, calories = ?, water = ?
                 WHERE id = 1`,
                stepsValue,
                caloriesValue,
                waterValue
            );
        } else {
            await transaction.runAsync(
                'INSERT INTO daily_goals (id, steps, calories, water) VALUES (1, ?, ?, ?)',
                stepsValue,
                caloriesValue,
                waterValue
            );
        }
    });
}
