import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import PageHeader from '../components/PageHeader';
import TopMessage from '../components/TopMessage';
import { getGoals, getGoalErrors, saveGoals } from '../features/health/goalService';

type Props = NativeStackScreenProps<RootStackParamList, 'EditGoals'>;

export default function EditGoals({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const [steps, setSteps] = useState('');
    const [calories, setCalories] = useState('');
    const [water, setWater] = useState('');
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [retry, setRetry] = useState(0);
    const errors = getGoalErrors(steps, calories, water);
    const invalid = errors.steps !== '' || errors.calories !== '' || errors.water !== '';

    usePreventRemove(saving, () => {});

    useEffect(() => {
        let active = true;
        setLoading(true);
        setLoaded(false);
        setError('');

        async function loadGoals() {
            try {
                const goals = await getGoals();

                if (active) {
                    if (!goals) {
                        navigation.replace('Goals');
                        return;
                    }

                    setSteps(goals.steps.toLocaleString('en-US'));
                    setCalories(goals.calories.toLocaleString('en-US'));
                    setWater(goals.water.toLocaleString('en-US'));
                    setLoaded(true);
                }
            } catch {
                if (active) {
                    setError('Could not load your goals. Please try again.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadGoals();

        return () => {
            active = false;
        };
    }, [navigation, retry]);

    async function saveDailyGoals() {
        if (!loaded || loading || saving || message !== '') {
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
            await saveGoals(steps, calories, water);
            setMessage('Daily goals saved');
        } catch (saveError) {
            setError(
                saveError instanceof Error
                    ? saveError.message
                    : 'Could not save your goals. Please try again.'
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
                    styles.content,
                    { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 20 },
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <PageHeader
                    title="Edit Goals"
                    titleSize={18}
                    onBack={() => {
                        if (!saving && message === '') {
                            navigation.goBack();
                        }
                    }}
                />

                {error !== '' && <Text style={styles.error}>{error}</Text>}

                {loading ? (
                    <Text style={styles.hint}>Loading your goals...</Text>
                ) : !loaded ? (
                    <AppButton
                        title="Retry loading"
                        variant="outline"
                        onPress={() => setRetry(retry + 1)}
                    />
                ) : (
                    <>
                        <AppInput
                            label="Steps"
                            value={steps}
                            onChangeText={setSteps}
                            keyboardType="number-pad"
                            placeholder="Enter daily steps"
                            editable={!saving && message === ''}
                            error={showErrors ? errors.steps : ''}
                        />
                        <AppInput
                            label="Calories (kcal)"
                            value={calories}
                            onChangeText={setCalories}
                            keyboardType="number-pad"
                            placeholder="Enter daily calories"
                            editable={!saving && message === ''}
                            error={showErrors ? errors.calories : ''}
                        />
                        <AppInput
                            label="Water (ml)"
                            value={water}
                            onChangeText={setWater}
                            keyboardType="number-pad"
                            placeholder="Enter daily water intake"
                            editable={!saving && message === ''}
                            error={showErrors ? errors.water : ''}
                        />
                        <View style={styles.buttons}>
                            <AppButton
                                title={saving ? 'Saving...' : 'Save goals'}
                                onPress={saveDailyGoals}
                                disabled={saving || message !== '' || (showErrors && invalid)}
                            />
                        </View>
                    </>
                )}
            </ScrollView>

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
        gap: 16,
    },
    buttons: {
        marginTop: 84,
    },
    hint: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 20,
    },
    error: {
        color: '#B42318',
        fontSize: 13,
        lineHeight: 18,
    },
});
