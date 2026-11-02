import { StyleSheet, Text, View, Pressable } from 'react-native';

type Props = {
    date: string;
    steps: number;
    calories: number;
    water: number;
    onPress: () => void;
};

export default function RecordCard({
    date,
    steps,
    calories,
    water,
    onPress,
}: Props) {
    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
            accessibilityRole="button"
        >
            <View>
                <Text style={styles.date}>
                    {date}
                </Text>
            </View>

            <View style={styles.values}>
                <Text style={styles.value}>
                    {steps.toLocaleString('en-US')} steps
                </Text>

                <Text style={styles.value}>
                    {calories.toLocaleString('en-US')} kcal
                </Text>

                <Text style={styles.value}>
                    {water.toLocaleString('en-US')} ml
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EAE7',
        borderRadius: 12,
        padding: 16,
        gap: 10,
    },
    date: {
        color: '#172B28',
        fontSize: 16,
        fontWeight: '600',
    },
    values: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    value: {
        color: '#697875',
        fontSize: 12,
    },
});
