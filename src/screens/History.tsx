import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';

import AppButton from '../components/AppButton';
import DatePicker from '../components/DatePicker';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import RecordCard from '../components/RecordCard';
import { getHealthRecords } from '../features/health/healthService';
import type { HealthRecord } from '../features/health/healthService';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

function formatDate(date: string) {
    return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function History({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const focused = useIsFocused();

    const [records, setRecords] = useState<HealthRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [showDate, setShowDate] = useState(false);

    const visibleRecords = filterDate
        ? records.filter((record) => record.date === filterDate)
        : records;
    const filterLabel = filterDate ? formatDate(filterDate) : 'All';

    useEffect(() => {
        if (!focused) {
            return;
        }

        let active = true;
        setLoading(true);
        setError('');

        async function loadRecords() {
            try {
                const savedRecords = await getHealthRecords();

                if (active) {
                    setRecords(savedRecords);
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

        loadRecords();

        return () => {
            active = false;
        };
    }, [focused]);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <PageHeader
                    title="Your history"
                    description={filterDate
                        ? `Records for ${filterLabel}`
                        : 'A daily record of your progress.'}
                />

                <Pressable
                    style={styles.filter}
                    accessibilityRole="button"
                    accessibilityLabel={`Filter history by date, ${filterLabel}`}
                    onPress={() => setShowDate(true)}
                >
                    <Text style={styles.filterLabel}>{filterLabel}</Text>
                    <Image source={require('../../assets/Filter.png')} style={styles.filterIcon} />
                </Pressable>

                <AppButton
                    title="Add health record"
                    onPress={() => navigation.navigate('AddRecord')}
                />

                {loading ? (
                    <Text>Loading your records...</Text>
                ) : error !== '' ? (
                    <Text style={styles.error}>{error}</Text>
                ) : visibleRecords.length === 0 ? (
                    <Text>{filterDate ? 'No records for this date.' : 'No records yet.'}</Text>
                ) : (
                    visibleRecords.map((record) => (
                        <RecordCard
                            key={record.id}
                            date={formatDate(record.date)}
                            steps={record.steps}
                            calories={record.calories}
                            water={record.water}
                            onPress={() => navigation.navigate('DailyRecord', { id: record.id })}
                        />
                    ))
                )}

                {filterDate !== '' && (
                    <AppButton
                        title="Clear filter"
                        variant="text"
                        onPress={() => setFilterDate('')}
                    />
                )}
            </ScrollView>

            <NavBar
                active="History"
                onHome={() => navigation.goBack()}
            />

            <DatePicker
                visible={showDate}
                value={filterDate}
                onSelect={setFilterDate}
                onClear={() => setFilterDate('')}
                onClose={() => setShowDate(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        padding: 20,
        gap: 16,
    },
    filter: {
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E3EAE7',
        borderRadius: 16,
    },
    filterLabel: {
        color: '#106B5C',
        fontSize: 16,
        fontWeight: '600',
    },
    filterIcon: {
        width: 24,
        height: 24,
    },
    error: {
        color: '#B42318',
    },
});
