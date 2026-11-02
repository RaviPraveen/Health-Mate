import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type WelcomeNavigation = NativeStackNavigationProp<
    RootStackParamList,
    'Welcome'
>;

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeNavigation>();
    const steps = 5000;
    const goal = 10000;
    const progress = Math.min(100, Math.round((steps / goal) * 100));
    const remaining = Math.max(goal - steps, 0);
    const circumference = 2 * Math.PI * 44;

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 32, height: 32, marginRight: 8 }}
                />
                <Text style={styles.logoname}>
                    HealthMate
                </Text>
            </View>

            <View>
                <Text style={styles.weltext}>
                    Welcome TO{'\n'}HealthMate
                </Text>
            </View>

            <View style={styles.prograsscard}>
                <View style={styles.cardtext1}>
                    <Text style={styles.DailyMovement}>
                        DAILY MOVEMENT
                    </Text>

                    <Text style={styles.date}>
                        30 OCT
                    </Text>
                </View>

                <View style={styles.cardtext2}>
                    <View style={styles.stepsNumber}>
                        <Text style={styles.steps}>
                            {steps.toLocaleString('en-US')}
                        </Text>

                        <Text style={styles.target}>
                            of {goal.toLocaleString('en-US')} steps
                        </Text>
                    </View>

                    <View style={styles.stautsCircle}>
                        <Svg width={100} height={100}>
                            <Circle
                                cx={50}
                                cy={50}
                                r={44}
                                stroke="#DAF3A0"
                                strokeWidth={7}
                                fill="none"
                            />

                            <Circle
                                cx={50}
                                cy={50}
                                r={44}
                                stroke="#009B77"
                                strokeWidth={7}
                                fill="none"
                                strokeDasharray={[
                                    circumference,
                                    circumference,
                                ]}
                                strokeDashoffset={
                                    circumference * (1 - progress / 100)
                                }
                                rotation={-90}
                                origin="50,50"
                            />
                        </Svg>

                        <View style={styles.circleText}>
                            <Text style={styles.percentage}>
                                {progress}%
                            </Text>

                            <Text style={styles.complete}>
                                complete
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.cardmessage}>
                    {remaining.toLocaleString('en-US')} more steps to your daily goal
                </Text>
            </View>

            <Pressable
                style={styles.Button1}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.ButtonText1}>
                    Get Started
                </Text>
            </Pressable>

            <Pressable
                style={styles.Button2}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.ButtonText2}>
                    I already have an account
                </Text>
            </Pressable>
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
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoname: {
        color: '#123E35',
        fontSize: 24,
    },
    weltext: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#172B28',
    },
    prograsscard: {
        marginTop: 30,
        borderRadius: 24,
        backgroundColor: '#123E35',
        padding: 20,
        gap: 20,
    },
    cardtext1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: '#DAF3A0',
        fontSize: 12,
    },
    DailyMovement: {
        color: '#DAF3A0',
        fontSize: 12,
    },
    cardtext2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    stepsNumber: {
        flex: 1,
    },
    steps: {
        color: '#fff',
        fontSize: 44,
        fontWeight: '600',
    },
    target: {
        color: '#fff',
        fontSize: 13,
        marginTop: 4,
    },
    stautsCircle: {
        width: 100,
        height: 100,
    },
    circleText: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentage: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    complete: {
        color: '#DAF3A0',
        fontSize: 10,
    },
    cardmessage: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 18,
    },
    Button1: {
        backgroundColor: '#123E35',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    Button2: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
    },
    ButtonText1: {
        color: '#ffffff',
        fontSize: 16,
    },
    ButtonText2: {
        color: '#123E35',
        fontSize: 16,
    },
});
