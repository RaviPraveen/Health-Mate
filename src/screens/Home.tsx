import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

import ProgressCard from '../components/ProgressCard';
import MetricCard from '../components/MetricCard';
import AppButton from '../components/AppButton';
import NavBar from '../components/NavBar';

import {
    getHealthRecord,
    getLocalDate,
} from '../features/health/healthService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const focused = useIsFocused();
    const today = getLocalDate();

    const goal = 10000;
    const waterGoal = 2500;
    const caloriesGoal = 500;

    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [water, setWater] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        if (!focused) {
            return;
        }

        let active = true;

        setLoading(true);
        setError('');

        async function loadHome() {
            try {
                const record = await getHealthRecord(today);

                if (active) {
                    setSteps(record?.steps ?? 0);
                    setCalories(record?.calories ?? 0);
                    setWater(record?.water ?? 0);
                }
            } catch {
                if (active) {
                    setError('Could not load your health records.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadHome();

        return () => {
            active = false;
        };
    }, [focused, today, retry]);

    const dateText = new Date(`${today}T12:00:00`).toLocaleDateString(
        'en-GB',
        {
            day: 'numeric',
            month: 'short',
        }
    ).toUpperCase();

    const fullDate = new Date(`${today}T12:00:00`).toLocaleDateString(
        'en-GB',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        }
    );

    const hour = new Date().getHours();

    let welcome = 'Morning';

    if (hour >= 12 && hour < 18) {
        welcome = 'Afternoon';
    }

    if (hour >= 18) {
        welcome = 'Evening';
    }

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.page,
                    { paddingTop: insets.top + 20 },
                ]}
            >
                <View style={styles.headingView}>
                    <View>
                        <Text style={styles.heading}>
                            {welcome}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.date}>
                            {fullDate}
                        </Text>
                    </View>
                </View>

                {loading ? (
                    <View>
                        <Text style={styles.description}>
                            Loading your records...
                        </Text>
                    </View>
                ) : error !== '' ? (
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.error}>
                                {error}
                            </Text>
                        </View>

                        <View>
                            <AppButton
                                title="Retry"
                                onPress={() => setRetry(retry + 1)}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <View>
                            <ProgressCard
                                steps={steps}
                                goal={goal}
                                date={dateText}
                            />
                        </View>

                        <View style={styles.cardsView}>
                            <MetricCard
                                title="Water"
                                value={water}
                                unit="ml"
                                message={`of ${waterGoal.toLocaleString('en-US')} ml`}
                                color="#168BF0"
                                backgroundColor="#C3E7FF"
                            />

                            <MetricCard
                                title="Calories"
                                value={calories}
                                unit="kcal"
                                message={`of ${caloriesGoal.toLocaleString('en-US')} kcal`}
                                color="#FF7A45"
                                backgroundColor="#FFDDC8"
                            />
                        </View>

                        <View>
                            <AppButton
                                title="Add record"
                                onPress={() => navigation.navigate('AddRecord')}
                            />
                        </View>
                    </View>
                )}
            </View>

            <NavBar
                active="Home"
                onHome={() => setRetry(retry + 1)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    page: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 20,
    },
    headingView: {
        gap: 4,
    },
    heading: {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: '600',
        color: '#172B28',
    },
    date: {
        fontSize: 14,
        lineHeight: 20,
        color: '#697875',
    },
    description: {
        fontSize: 16,
        color: '#697875',
    },
    content: {
        gap: 24,
    },
    cardsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    error: {
        color: '#B42318',
        fontSize: 14,
    },
});
