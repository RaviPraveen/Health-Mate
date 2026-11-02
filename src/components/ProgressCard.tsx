import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from './ProgressCircle';

type Props = {
    steps: number;
    goal: number;
    date: string;
};

export default function ProgressCard({
    steps,
    goal,
    date,
}: Props) {
    const remaining = Math.max(goal - steps, 0);

    return (
        <View style={styles.prograsscard}>
            <View style={styles.cardtext1}>
                <Text style={styles.DailyMovement}>
                    DAILY MOVEMENT
                </Text>

                <Text style={styles.date}>
                    {date}
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
                    <ProgressCircle
                        value={steps}
                        goal={goal}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.cardmessage}>
                    {goal <= 0
                        ? 'Set your daily step goal'
                        : remaining === 0
                            ? 'You reached your daily step goal'
                            : `${remaining.toLocaleString('en-US')} more steps to your daily goal`}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    prograsscard: {
        backgroundColor: '#123E35',
        borderRadius: 24,
        padding: 20,
        gap: 20,
    },
    cardtext1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
    },
    DailyMovement: {
        color: '#DAF3A0',
        fontSize: 12,
        fontWeight: '600',
    },
    date: {
        color: '#DAF3A0',
        fontSize: 12,
    },
    cardtext2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
    },
    stepsNumber: {
        flexGrow: 1,
        flexBasis: 120,
    },
    steps: {
        color: '#FFFFFF',
        fontSize: 44,
        fontWeight: '600',
    },
    target: {
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 4,
    },
    stautsCircle: {
        alignItems: 'center',
    },
    cardmessage: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 18,
    },
});
