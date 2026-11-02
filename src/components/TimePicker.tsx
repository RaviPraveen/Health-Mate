import { StyleSheet, Text, View, FlatList } from 'react-native';

type Props = {
    hour: number;
    minute: number;
    period: 'AM' | 'PM';
    onHourChange: (hour: number) => void;
    onMinuteChange: (minute: number) => void;
    onPeriodChange: (period: 'AM' | 'PM') => void;
};

export default function TimePicker({
    hour,
    minute,
    period,
    onHourChange,
    onMinuteChange,
    onPeriodChange,
}: Props) {
    const hours = Array.from({ length: 12 }, (_, index) => index + 1);
    const minutes = Array.from({ length: 60 }, (_, index) => index);
    const periods: ('AM' | 'PM')[] = ['AM', 'PM'];

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Set time
                </Text>
            </View>

            <View style={styles.wheelView}>
                <View
                    pointerEvents="none"
                    style={styles.selectedRow}
                />

                <View style={styles.column}>
                    <FlatList
                        data={hours}
                        keyExtractor={(item) => String(item)}
                        initialScrollIndex={Math.min(11, Math.max(0, hour - 1))}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={44}
                        decelerationRate="fast"
                        bounces={false}
                        overScrollMode="never"
                        contentContainerStyle={styles.listContent}
                        getItemLayout={(_, index) => ({
                            length: 44,
                            offset: 44 * index,
                            index,
                        })}
                        onScroll={(event) => {
                            const index = Math.min(
                                11,
                                Math.max(
                                    0,
                                    Math.round(
                                        event.nativeEvent.contentOffset.y / 44
                                    )
                                )
                            );

                            onHourChange(index + 1);
                        }}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text
                                    style={[
                                        styles.number,
                                        item === hour && styles.selectedNumber,
                                    ]}
                                >
                                    {String(item).padStart(2, '0')}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.colonView}>
                    <Text style={styles.colon}>
                        :
                    </Text>
                </View>

                <View style={styles.column}>
                    <FlatList
                        data={minutes}
                        keyExtractor={(item) => String(item)}
                        initialScrollIndex={Math.min(59, Math.max(0, minute))}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={44}
                        decelerationRate="fast"
                        bounces={false}
                        overScrollMode="never"
                        contentContainerStyle={styles.listContent}
                        getItemLayout={(_, index) => ({
                            length: 44,
                            offset: 44 * index,
                            index,
                        })}
                        onScroll={(event) => {
                            const index = Math.min(
                                59,
                                Math.max(
                                    0,
                                    Math.round(
                                        event.nativeEvent.contentOffset.y / 44
                                    )
                                )
                            );

                            onMinuteChange(index);
                        }}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text
                                    style={[
                                        styles.number,
                                        item === minute && styles.selectedNumber,
                                    ]}
                                >
                                    {String(item).padStart(2, '0')}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.column}>
                    <FlatList
                        data={periods}
                        keyExtractor={(item) => item}
                        initialScrollIndex={period === 'AM' ? 0 : 1}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={44}
                        decelerationRate="fast"
                        bounces={false}
                        overScrollMode="never"
                        contentContainerStyle={styles.listContent}
                        getItemLayout={(_, index) => ({
                            length: 44,
                            offset: 44 * index,
                            index,
                        })}
                        onScroll={(event) => {
                            const index = Math.min(
                                1,
                                Math.max(
                                    0,
                                    Math.round(
                                        event.nativeEvent.contentOffset.y / 44
                                    )
                                )
                            );

                            onPeriodChange(index === 0 ? 'AM' : 'PM');
                        }}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text
                                    style={[
                                        styles.number,
                                        item === period && styles.selectedNumber,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    title: {
        color: '#172B28',
        fontSize: 20,
        fontWeight: '600',
    },
    wheelView: {
        height: 132,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    selectedRow: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 44,
        height: 44,
        backgroundColor: '#E8F4EF',
        borderRadius: 12,
    },
    column: {
        flex: 1,
        height: 132,
    },
    listContent: {
        paddingVertical: 44,
    },
    item: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: '#697875',
        fontSize: 22,
    },
    selectedNumber: {
        color: '#123E35',
        fontWeight: '600',
    },
    colonView: {
        height: 132,
        justifyContent: 'center',
    },
    colon: {
        color: '#123E35',
        fontSize: 24,
        fontWeight: '600',
    },
});
