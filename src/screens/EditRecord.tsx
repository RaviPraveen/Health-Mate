import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';

import AppButton from '../components/AppButton';
import HealthRecordForm from '../components/HealthRecordForm';
import PageHeader from '../components/PageHeader';
import TopMessage from '../components/TopMessage';

import {
    getHealthRecordById,
    updateHealthRecord,
    getHealthRecordErrors,
} from '../features/health/healthService';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRecord'>;

export default function EditRecord({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const id = route.params.id;

    const [date, setDate] = useState('');
    const [steps, setSteps] = useState('');
    const [calories, setCalories] = useState('');
    const [water, setWater] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [retry, setRetry] = useState(0);
    const errors = getHealthRecordErrors(steps, calories, water);
    const invalid = errors.steps !== '' || errors.calories !== '' || errors.water !== '';

    usePreventRemove(saving, () => {});

    useEffect(() => {
        let active = true;
        setDate('');
        setError('');
        setShowErrors(false);

        async function loadRecord() {
            try {
                const record = await getHealthRecordById(id);

                if (!active) {
                    return;
                }

                if (!record) {
                    setError('This record could not be found.');
                    return;
                }

                setDate(record.date);
                setSteps(String(record.steps));
                setCalories(String(record.calories));
                setWater(String(record.water));
            } catch {
                if (active) {
                    setError('Could not load this record.');
                }
            }
        }

        loadRecord();

        return () => {
            active = false;
        };
    }, [id, retry]);

    async function saveChanges() {
        if (date === '' || saving || message !== '') {
            return;
        }

        Keyboard.dismiss();
        setError('');
        setShowErrors(true);

        if (invalid) {
            return;
        }

        setSaving(true);

        try {
            await updateHealthRecord(id, steps, calories, water);
            setMessage('Record updated');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Could not save your changes.'
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.page,
                    { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <PageHeader
                        title="Edit health record"
                        description="One record per day. All values are daily totals."
                        onBack={() => navigation.goBack()}
                    />
                </View>

                {error !== '' && (
                    <Text style={styles.error}>{error}</Text>
                )}

                {date === '' && error === '' && (
                    <Text style={styles.loading}>Loading record...</Text>
                )}
                {date === '' && error !== '' && (
                    <AppButton title="Retry loading" onPress={() => setRetry(retry + 1)} />
                )}

                {date !== '' && (
                    <View style={styles.content}>
                        <View pointerEvents={saving || message !== '' ? 'none' : 'auto'}>
                            <HealthRecordForm
                                date={new Date(`${date}T12:00:00`).toLocaleDateString(
                                    'en-GB',
                                    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                                )}
                                steps={steps}
                                calories={calories}
                                water={water}
                                onStepsChange={setSteps}
                                onCaloriesChange={setCalories}
                                onWaterChange={setWater}
                                stepsError={showErrors ? errors.steps : ''}
                                caloriesError={showErrors ? errors.calories : ''}
                                waterError={showErrors ? errors.water : ''}
                            />
                        </View>

                        <View style={styles.buttons}>
                            <View>
                                <AppButton
                                    title={saving ? 'Saving...' : 'Save changes'}
                                    onPress={saveChanges}
                                    disabled={saving || message !== '' || (showErrors && invalid)}
                                />
                            </View>

                            <View>
                                <AppButton
                                    title="Cancel"
                                    variant="redText"
                                    onPress={() => navigation.goBack()}
                                    disabled={saving || message !== ''}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            <TopMessage
                message={message}
                onFinish={() => navigation.goBack()}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    page: {
        paddingHorizontal: 20,
        gap: 20,
    },
    content: {
        gap: 20,
    },
    buttons: {
        gap: 8,
    },
    error: {
        color: '#B42318',
    },
    loading: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 20,
    },
});
