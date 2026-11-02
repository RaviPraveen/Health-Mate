import { StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

type Props = {
    title: string;
    value: number;
    unit: string;
    message?: string;
    color: string;
    backgroundColor: string;
    icon?: ReactNode;
};

export default function MetricCard({
    title,
    value,
    unit,
    message = '',
    color,
    backgroundColor,
    icon,
}: Props) {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            <View style={styles.titleView}>
                {icon}

                <Text style={[styles.title, { color }]}>
                    {title}
                </Text>
            </View>

            <View style={styles.valueView}>
                <Text style={[styles.value, { color }]}>
                    {value.toLocaleString('en-US')}
                </Text>

                <Text style={[styles.unit, { color }]}>
                    {unit}
                </Text>
            </View>

            {message !== '' && (
                <View>
                    <Text style={[styles.message, { color }]}>
                        {message}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: 120,
        borderRadius: 20,
        padding: 16,
        gap: 10,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    title: {
        fontSize: 13,
        flexShrink: 1,
    },
    valueView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        gap: 4,
    },
    value: {
        fontSize: 28,
        fontWeight: '600',
    },
    unit: {
        fontSize: 12,
    },
    message: {
        fontSize: 12,
        lineHeight: 18,
    },
});
