import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

import ProgressCard from '../components/ProgressCard';
import MetricCard from '../components/MetricCard';
import AppButton from '../components/AppButton';
import NavBar from '../components/NavBar';
import RecordCard from '../components/RecordCard';

import {
    getHealthRecords,
    getLocalDate,
} from '../features/health/healthService';
import type { HealthRecord } from '../features/health/healthService';
import { getGoals } from '../features/health/goalService';
import type { DailyGoals } from '../features/health/goalService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const focused = useIsFocused();
    const today = getLocalDate();

    const [goals, setGoals] = useState<DailyGoals | null>(null);
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [water, setWater] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);
    const [recentRecord, setRecentRecord] = useState<HealthRecord | null>(null);

    useEffect(() => {
        if (!focused) {
            return;
        }

        let active = true;

        setLoading(true);
        setError('');

        async function loadHome() {
            try {
                const records = await getHealthRecords();
                const savedGoals = await getGoals();
                const record = records.find((record) => record.date === today);

                if (active) {
                    setSteps(record?.steps ?? 0);
                    setCalories(record?.calories ?? 0);
                    setWater(record?.water ?? 0);
                    setRecentRecord(records[0] ?? null);
                    setGoals(savedGoals);
                }
            } catch {
                if (active) {
                    setError('Could not load your records and daily goals.');
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

    const yesterday = new Date(`${today}T12:00:00`);
    yesterday.setDate(yesterday.getDate() - 1);
    let recentDate = '';

    if (recentRecord) {
        const day = new Date(`${recentRecord.date}T12:00:00`);
        const label = recentRecord.date === today
            ? 'Today'
            : recentRecord.date === getLocalDate(yesterday)
                ? 'Yesterday'
                : day.toLocaleDateString('en-GB', { weekday: 'long' });
        recentDate = `${label} · ${day.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        })}`;
    }

    const waterRemaining = goals ? Math.max(0, goals.water - water) : 0;
    const calorieProgress = goals ? Math.round((calories / goals.calories) * 100) : 0;

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={[
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

                    {goals && (
                        <Pressable
                            style={styles.goalsButton}
                            onPress={() => navigation.navigate('EditGoals')}
                            accessibilityRole="button"
                            accessibilityLabel="Edit daily goals"
                        >
                            <Text style={styles.viewAllText}>Edit daily goals</Text>
                        </Pressable>
                    )}
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
                ) : goals ? (
                    <View style={styles.content}>
                        <View>
                            <ProgressCard
                                steps={steps}
                                goal={goals.steps}
                                date={dateText}
                            />
                        </View>

                        <View style={styles.cardsView}>
                            <MetricCard
                                title="Water"
                                value={water}
                                unit="ml"
                                message={waterRemaining > 0
                                    ? `${waterRemaining.toLocaleString('en-US')} ml to go`
                                    : 'Daily goal reached'}
                                color="#008FFF"
                                messageColor="#328BD1"
                                backgroundColor="#C1E5FF"
                                icon={<Image source={require('../../assets/Water.png')} style={styles.metricIcon} />}
                            />

                            <MetricCard
                                title="Calories"
                                value={calories}
                                unit="kcal"
                                message={`${calorieProgress}% of daily goal`}
                                color="#FF6400"
                                backgroundColor="#FFDCC6"
                                icon={<Image source={require('../../assets/Calories.png')} style={styles.metricIcon} />}
                            />
                        </View>

                        <View>
                            <AppButton
                                title="Add record"
                                height={52}
                                onPress={() => navigation.navigate('AddRecord')}
                            />
                        </View>
                        <View style={styles.recent}>
                            <View style={styles.recentHeading}>
                                <Text style={styles.sectionTitle}>Recent activity</Text>
                                <Pressable
                                    onPress={() => navigation.navigate('History')}
                                    accessibilityRole="button"
                                    accessibilityLabel="View all health records"
                                    hitSlop={12}
                                    style={styles.viewAll}
                                >
                                    <Text style={styles.viewAllText}>View all</Text>
                                </Pressable>
                            </View>
                            {recentRecord ? (
                                <RecordCard
                                    date={recentDate}
                                    steps={recentRecord.steps}
                                    calories={recentRecord.calories}
                                    water={recentRecord.water}
                                    onPress={() => navigation.navigate('DailyRecord', { id: recentRecord.id })}
                                />
                            ) : (
                                <Text style={styles.description}>No records yet. Add your first health record.</Text>
                            )}
                        </View>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <Text style={styles.description}>
                            Set your daily goals to see your progress.
                        </Text>
                        <AppButton
                            title="Set daily goals"
                            onPress={() => navigation.navigate('Goals')}
                        />
                    </View>
                )}
            </ScrollView>

            <NavBar
                active="Home"
                onHome={() => setRetry(retry + 1)}
                onHistory={() => navigation.navigate('History')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    page: {
        paddingHorizontal:20,
        paddingBottom:20,
        gap:16,
    },
    headingView: {
        gap:4,
    },
    goalsButton: {
        minHeight: 40,
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    heading: {
        fontSize:26,
        lineHeight:34,
        fontWeight:'600',
        color: '#172B28',
    },
    date: {
        fontSize:14,
        lineHeight:20,
        color:'#697875',
    },
    description: {
        fontSize:14,
        lineHeight:20,
        color:'#697875',
    },
    content: {
        gap:20,
    },
    cardsView: {
        flexDirection:'row',
        flexWrap:'wrap',
        gap:16,
    },
    metricIcon: {
        width:24,
        height:24,
    },
    recent: {
        gap:16,
    },
    recentHeading: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        gap:8,
    },
    sectionTitle: {
        fontSize:18,
        lineHeight:25,
        fontWeight:'600',
        color:'#172B28',
    },
    viewAll: {
        minHeight:20,
        justifyContent:'center',
    },
    viewAllText: {
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
        color:'#106B5C',
    },
    error: {
        color:'#B42318',
        fontSize:14,
    },
});
