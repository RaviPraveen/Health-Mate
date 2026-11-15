import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import Logo from '../components/Logo';
import ProgressCard from '../components/ProgressCard';
import AppButton from '../components/AppButton';
import { getGoals } from '../features/health/goalService';

type WelcomeNavigation = NativeStackNavigationProp<
    RootStackParamList,
    'Welcome'
>;

export default function WelcomeScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<WelcomeNavigation>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const steps = 7850;
    const goal = 10000;

    async function getStarted() {
        if (loading) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const goals = await getGoals();

            if (goals) {
                navigation.replace('Home');
            } else {
                navigation.navigate('Goals');
            }
        } catch {
            setError('Could not load your goals. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[
                styles.content,
                { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
            ]}
        >
            <View>
                <Logo />
            </View>

            <View>
                <Text style={styles.weltext}>
                    Welcome to{'\n'}HealthMate.
                </Text>
            </View>

            <View style={styles.prograsscard}>
                <ProgressCard
                    steps={steps}
                    goal={goal}
                    date="26 OCT"
                />
            </View>

            <View style={styles.button}>
                {error !== '' && <Text style={styles.error}>{error}</Text>}
                <AppButton
                    title={loading ? 'Loading...' : 'Get started'}
                    onPress={getStarted}
                    disabled={loading}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingHorizontal: 20,
        gap: 24,
    },
    weltext: {
        fontSize: 34,
        lineHeight: 42,
        fontWeight: '600',
        color: '#172B28',
    },
    prograsscard: {
        marginTop: 36,
    },
    button: {
        marginTop: 12,
        gap: 12,
    },
    error: {
        color: '#B42318',
        fontSize: 13,
        lineHeight: 18,
    },
});
