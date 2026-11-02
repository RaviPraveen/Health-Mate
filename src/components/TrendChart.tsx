import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    description?: string;
    color: string;
    data: {
        label: string;
        value: number;
    }[];
};

export default function TrendChart({
    title,
    description = '',
    color,
    data,
}: Props) {
    const maximum = Math.max(
        1,
        ...data.map((item) => Math.max(0, item.value))
    );

    return (
        <View style={styles.card}>
            <View style={styles.heading}>
                <Text style={styles.title}>
                    {title}
                </Text>

                {description !== '' && (
                    <Text style={styles.description}>
                        {description}
                    </Text>
                )}
            </View>

            {data.length === 0 ? (
                <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>
                        No records to show
                    </Text>
                </View>
            ) : (
                <View style={styles.chart}>
                    {data.map((item, index) => (
                        <View
                            key={`${item.label}-${index}`}
                            style={styles.column}
                        >
                            <View>
                                <Text
                                    style={styles.value}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                >
                                    {item.value.toLocaleString('en-US')}
                                </Text>
                            </View>

                            <View style={styles.barSpace}>
                                <View
                                    style={[
                                        styles.bar,
                                        {
                                            backgroundColor: color,
                                            height:
                                                (Math.max(0, item.value) / maximum) * 100,
                                        },
                                    ]}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>
                                    {item.label}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EAE7',
        borderRadius: 16,
        padding: 16,
        gap: 20,
    },
    heading: {
        gap: 6,
    },
    title: {
        color: '#172B28',
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        color: '#697875',
        fontSize: 13,
    },
    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 6,
    },
    column: {
        flex: 1,
        minWidth: 0,
        gap: 8,
    },
    value: {
        color: '#697875',
        fontSize: 10,
        textAlign: 'center',
    },
    barSpace: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bar: {
        width: '70%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    label: {
        color: '#697875',
        fontSize: 10,
        textAlign: 'center',
    },
    emptyView: {
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#697875',
        fontSize: 14,
    },
});
