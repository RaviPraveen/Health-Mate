import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

import Logo from '../components/Logo';
import ProgressCard from '../components/ProgressCard';
import AppButton from '../components/AppButton';

type WelcomeNavigation = NativeStackNavigationProp<
    RootStackParamList,
    'Welcome'
>;

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeNavigation>();

    const steps = 5000;
    const goal = 10000;

    return (
        <View style={styles.container}>
            <View>
                <Logo />
            </View>

            <View>
                <Text style={styles.weltext}>
                    Welcome TO{'\n'}HealthMate
                </Text>
            </View>

            <View style={styles.prograsscard}>
                <ProgressCard
                    steps={steps}
                    goal={goal}
                    date="30 OCT"
                />
            </View>

            <View>
                <AppButton
                    title="Get Started"
                    onPress={() => navigation.replace('Home')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        gap: 24,
    },
    weltext: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#172B28',
    },
    prograsscard: {
        marginTop: 30,
    },
});
