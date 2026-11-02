import { StyleSheet, Text, View, Pressable, Switch } from 'react-native';

type Props = {
    time: string;
    days: string;
    enabled: boolean;
    onPress: () => void;
    onChange: (enabled: boolean) => void;
};

export default function ReminderRow({
    time,
    days,
    enabled,
    onPress,
    onChange,
}: Props) {
    return (
        <View style={styles.row}>
            <Pressable
                style={styles.textView}
                onPress={onPress}
                accessibilityRole="button"
            >
                <View>
                    <Text style={styles.time}>
                        {time}
                    </Text>
                </View>

                <View>
                    <Text style={styles.days}>
                        {days}
                    </Text>
                </View>
            </Pressable>

            <View>
                <Switch
                    value={enabled}
                    onValueChange={onChange}
                    trackColor={{
                        false: '#DCE5E1',
                        true: '#168C76',
                    }}
                    thumbColor="#FFFFFF"
                    accessibilityLabel="Reminder enabled"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E3EAE7',
        paddingVertical: 16,
        gap: 12,
    },
    textView: {
        flex: 1,
        gap: 6,
    },
    time: {
        color: '#172B28',
        fontSize: 20,
        fontWeight: '600',
    },
    days: {
        color: '#697875',
        fontSize: 13,
        lineHeight: 19,
    },
});
