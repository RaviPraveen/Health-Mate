import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import PageHeader from '../components/PageHeader';
import TopMessage from '../components/TopMessage';
import { getGoalErrors, saveGoals } from '../features/health/goalService';

type Props = NativeStackScreenProps<RootStackParamList, 'Goals'>;

export default function Goals({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const [steps, setSteps] = useState('');
    const [calories, setCalories] = useState('');
    const [water, setWater] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const errors = getGoalErrors(steps, calories, water);
    const invalid = errors.steps !== '' || errors.calories !== '' || errors.water !== '';

    usePreventRemove(saving, () => {});

    async function saveDailyGoals() {
        if (saving || message !== '') {
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
                    title="Daily Goals"
                    titleSize={18}
                    onBack={() => {
                        if (!saving && message === '') {
                            navigation.goBack();
                        }
                    }}
                />

                {error !== '' && <Text style={styles.error}>{error}</Text>}

                <AppInput
                    label="Steps"
                    value={steps}
                    onChangeText={setSteps}
                    placeholder="Enter daily steps"
                    editable={!saving && message === ''}
                    error={showErrors ? errors.steps : ''}
                />
                <AppInput
                    label="Calories (kcal)"
                    value={calories}
                    onChangeText={setCalories}
                    placeholder="Enter daily calories"
                    editable={!saving && message === ''}
                    error={showErrors ? errors.calories : ''}
                />
                <AppInput
                    label="Water (ml)"
                    value={water}
                    onChangeText={setWater}
                    placeholder="Enter daily water intake"
                    editable={!saving && message === ''}
                    error={showErrors ? errors.water : ''}
                />
                <View style={styles.buttons}>
                    <AppButton
                        title={saving ? 'Saving...' : 'Get started'}
                        onPress={saveDailyGoals}
                        disabled={saving || message !== '' || (showErrors && invalid)}
                    />
                </View>
            </ScrollView>

            <TopMessage
                message={message}
                onFinish={() => {
                    setMessage('');
                    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
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
    error: {
        color: '#B42318',
        fontSize: 13,
        lineHeight: 18,
    },
});
