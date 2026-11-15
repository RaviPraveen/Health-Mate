import { StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

type Props = {title: string;value: number; unit: string;message?: string; color: string; backgroundColor: string; messageColor?: string; icon?: ReactNode;
};

export default function MetricCard({title,value,unit,message = '',color,backgroundColor,messageColor = color,icon,
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
                    <Text style={[styles.message, { color: messageColor }]}>
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
        minHeight: 130,
        borderRadius: 20,
        padding: 16,
        gap: 8,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
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
        lineHeight: 38,
        fontWeight: '600',
    },
    unit: {
        fontSize: 12,
        lineHeight: 16,
    },
    message: {
        fontSize: 11,
        lineHeight: 15,
        fontWeight: '500',
    },
});
