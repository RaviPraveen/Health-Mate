import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

import PageHeader from '../components/PageHeader';
import HealthRecordForm from '../components/HealthRecordForm';
import AppButton from '../components/AppButton';
import DatePicker from '../components/DatePicker';
import TopMessage from '../components/TopMessage';

import {
    getLocalDate,
    getHealthRecord,
    saveHealthRecord,
    getHealthRecordErrors,
} from '../features/health/healthService';

type Props = NativeStackScreenProps<RootStackParamList, 'AddRecord'>;

export default function AddRecord({ navigation }: Props) {
    const insets = useSafeAreaInsets();

    const [date, setDate] = useState(getLocalDate());
    const [steps, setSteps] = useState('');
    const [calories, setCalories] = useState('');
    const [water, setWater] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveFailed, setSaveFailed] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [retry, setRetry] = useState(0);
    const [showErrors, setShowErrors] = useState(false);
    const errors = getHealthRecordErrors(steps, calories, water);
    const invalid = errors.steps !== '' || errors.calories !== '' || errors.water !== '';

    usePreventRemove(saving, () => {});

    useEffect(() => {
        let active = true;

        setLoading(true);
        setLoaded(false);
        setError('');
        setSaveFailed(false);
        setShowErrors(false);

        async function loadRecord() {
            try {
                const record = await getHealthRecord(date);

                if (active) {
                    setSteps(record ? String(record.steps) : '');
                    setCalories(record ? String(record.calories) : '');
                    setWater(record ? String(record.water) : '');
                    setLoaded(true);
                }
            } catch {
                if (active) {
                    setError('Could not load this record. Please try again.');
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
    }, [date, retry]);

    async function saveRecord() {
        if (!loaded || loading || saving || message !== '') {
            return;
        }

        setError('');
        setSaveFailed(false);
        Keyboard.dismiss();
        setShowErrors(true);

        if (invalid) {
            return;
        }

        setSaving(true);

        try {
            await saveHealthRecord(date, steps, calories, water);
            setMessage('Record saved');
        } catch {
            setSaveFailed(true);
        } finally {
            setSaving(false);
        }
    }

    const dateText = new Date(`${date}T12:00:00`).toLocaleDateString(
        'en-GB',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }
    );

    let saveTitle = 'Save record';

    if (loading) {
        saveTitle = 'Loading...';
    } else if (saving) {
        saveTitle = 'Saving...';
    } else if (saveFailed) {
        saveTitle = 'Retry save';
    }

    let description = 'One record per day. All values are daily totals.';
    let topPadding = insets.top + 16;

    if (saveFailed) {
        description = 'Your entries are still here.';
        topPadding = 20;
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {saveFailed && (
                <View style={[styles.errorBanner, { paddingTop: insets.top + 16 }]}>
                    <TopMessage
                        message="Record wasn't saved. Please try again."
                        type="error"
                        autoHide={false}
                        inline
                        onFinish={() => setSaveFailed(false)}
                    />
                </View>
            )}

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingTop: topPadding, paddingBottom: insets.bottom + 20 },
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <PageHeader
                        title="Add health record"
                        description={description}
                        onBack={() => navigation.goBack()}
                    />
                </View>

                {error !== '' && (
                    <View>
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    </View>
                )}

                {!loading && !loaded && (
                    <View>
                        <AppButton
                            title="Retry loading"
                            variant="outline"
                            onPress={() => setRetry(retry + 1)}
                        />
                    </View>
                )}

                <View
                    pointerEvents={
                        !loaded || loading || saving || message !== ''
                            ? 'none'
                            : 'auto'
                    }
                >
                    <HealthRecordForm
                        date={dateText}
                        steps={steps}
                        calories={calories}
                        water={water}
                        onDatePress={() => {
                            Keyboard.dismiss();
                            setShowDate(true);
                        }}
                        onStepsChange={setSteps}
                        onCaloriesChange={setCalories}
                        onWaterChange={setWater}
                        stepsError={showErrors ? errors.steps : ''}
                        caloriesError={showErrors ? errors.calories : ''}
                        waterError={showErrors ? errors.water : ''}
                        showHint={!saveFailed}
                    />
                </View>

                <View style={styles.buttonsView}>
                    <View>
                        <AppButton
                            title={saveTitle}
                            onPress={saveRecord}
                            disabled={
                                !loaded || loading || saving || message !== '' || (showErrors && invalid)
                            }
                        />
                    </View>

                    <View>
                        <AppButton
                            title={saveFailed ? 'Keep editing' : 'Cancel'}
                            variant={saveFailed ? 'text' : 'redText'}
                            onPress={() => {
                                if (saveFailed) {
                                    setSaveFailed(false);
                                } else {
                                    navigation.goBack();
                                }
                            }}
                            disabled={saving || message !== ''}
                        />
                    </View>
                </View>
            </ScrollView>

            <DatePicker
                visible={showDate}
                value={date}
                onSelect={setDate}
                onClose={() => setShowDate(false)}
            />

            <TopMessage
                message={message}
                onFinish={() => {
                    setMessage('');
                    navigation.goBack();
                }}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        paddingHorizontal: 20,
        gap: 20,
    },
    errorBanner: {
        paddingHorizontal: 20,
    },
    buttonsView: {
        gap: 8,
    },
    error: {
        color: '#B42318',
        fontSize: 13,
        lineHeight: 18,
    },
});
