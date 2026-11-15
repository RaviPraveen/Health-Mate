import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useFocusEffect, usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';

import AppButton from '../components/AppButton';
import ConfirmBox from '../components/ConfirmBox';
import PageHeader from '../components/PageHeader';
import ProgressCircle from '../components/ProgressCircle';
import TopMessage from '../components/TopMessage';
import { deleteHealthRecord, getHealthRecordById } from '../features/health/healthService';
import type { HealthRecord } from '../features/health/healthService';
import { getGoals } from '../features/health/goalService';
import type { DailyGoals } from '../features/health/goalService';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyRecord'>;

export default function DailyRecord({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const circleSize = Math.min(104, (width - 56) / 3);
    const { id } = route.params;
    const [record, setRecord] = useState<HealthRecord | null>(null);
    const [goals, setGoals] = useState<DailyGoals | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [retry, setRetry] = useState(0);

    usePreventRemove(deleting, () => {});

    useFocusEffect(useCallback(() => {
        let active = true;
        setLoading(true);
        setError('');

        async function loadRecord() {
            try {
                const savedRecord = await getHealthRecordById(id);
                const savedGoals = await getGoals();
                if (active) {
                    setRecord(savedRecord);
                    setGoals(savedGoals);
                }
            } catch {
                if (active) {
                    setRecord(null);
                    setError('Could not load this record.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadRecord();

        return () => {
            active = false;
        };
    }, [id, retry]));

    async function confirmDelete() {
        if (!record || deleting || deleted) {
            return;
        }

        setShowConfirm(false);
        setDeleting(true);
        setError('');

        try {
            await deleteHealthRecord(id);
            setDeleted(true);
        } catch {
            setError('Could not delete this record.');
        } finally {
            setDeleting(false);
        }
    }

    const dateText = record
        ? new Date(`${record.date}T12:00:00`).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '';

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[
                styles.content,
                { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
            ]}>
            <PageHeader title="Daily record" onBack={() => navigation.goBack()} />

            {error !== '' && <Text style={styles.error}>{error}</Text>}
            {error !== '' && !record && (
                <AppButton title="Retry loading" onPress={() => setRetry(retry + 1)} />
            )}

            {loading ? (
                <Text style={styles.date}>Loading record...</Text>
            ) : record && goals ? (
                <>
                    <Text style={styles.date}>{dateText}</Text>

                    <View style={styles.metrics}>
                        <View style={styles.metric}>
                            <ProgressCircle
                                value={record.steps}
                                goal={goals.steps}
                                size={circleSize}
                                showValue
                                label="Steps"
                                unit="steps"
                                color="#168C76"
                                trackColor="#DCECE8"
                                textColor="#172B28"
                            />
                        </View>

                        <View style={styles.metric}>
                            <ProgressCircle
                                value={record.calories}
                                goal={goals.calories}
                                size={circleSize}
                                showValue
                                label="Calories"
                                unit="kcal"
                                color="#E87837"
                                trackColor="#FCE4D6"
                                textColor="#172B28"
                            />
                        </View>

                        <View style={styles.metric}>
                            <ProgressCircle
                                value={record.water}
                                goal={goals.water}
                                size={circleSize}
                                showValue
                                label="Water"
                                unit="ml"
                                color="#168BF0"
                                trackColor="#DCEEFF"
                                textColor="#172B28"
                            />
                        </View>
                    </View>

                    <Text style={styles.date}>
                        Progress uses your current daily goals.
                    </Text>

                    <View style={styles.buttons}>
                        <AppButton
                            title="Edit record"
                            onPress={() => navigation.navigate('EditRecord', { id })}
                            disabled={deleting || deleted}
                        />
                        <AppButton
                            title={deleting ? 'Deleting...' : 'Delete record'}
                            variant="redText"
                            onPress={() => setShowConfirm(true)}
                            disabled={deleting || deleted}
                        />
                    </View>
                </>
            ) : error === '' && (
                record ? (
                    <AppButton
                        title="Set daily goals"
                        onPress={() => navigation.navigate('Goals')}
                    />
                ) : (
                    <Text style={styles.date}>This record could not be found.</Text>
                )
            )}
            </ScrollView>

            <ConfirmBox
                visible={showConfirm}
                title="Delete this record?"
                message={dateText}
                confirmTitle="Delete record"
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
            <TopMessage
                message={deleted ? 'Record deleted' : ''}
                onFinish={() => navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    content: {
        paddingHorizontal:20,
        gap:20,
    },
    date: {
        color:'#697875',
        fontSize:14,
        lineHeight:20,
    },
    error: {
        color:'#B42318',
    },
    metrics: {
        flexDirection:'row',
        justifyContent:'space-between',
        gap: 8,
        marginTop:28,
        marginBottom:28,
    },
    metric: {
        flex:1,
        alignItems:'center',
    },
    buttons: {
        gap:20,
    },
});
