import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import AppButton from './AppButton';

type Props = {  visible: boolean;  value: string; onSelect: (date: string) => void; onClose: () => void; onClear?: () => void;
};

export default function DatePicker({  visible, value,onSelect, onClose,  onClear,
}: Props) {
    const today = new Date();

    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(value);

    useEffect(() => {
        if (visible) {
            const date = value !== ''
                ? new Date(`${value}T12:00:00`)
                : new Date();

            setMonth(date.getMonth());
            setYear(date.getFullYear());
            setSelectedDate(value);
        }
    }, [visible, value]);

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = Array.from(
        { length: 42 },
        (_, index) => index - firstDay + 1
    );

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const monthTitle = new Date(year, month, 1).toLocaleDateString(
        'en-GB',
        {
            month: 'long',
            year: 'numeric',
        }
    );

    function previousMonth() {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    function nextMonth() {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    function applyDate() {
        if (selectedDate === '') {
            return;
        }

        onSelect(selectedDate);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.background}>
                <View style={styles.box}>
                    <View>
                        <Text style={styles.title}>
                            Choose date
                        </Text>
                    </View>

                    <View style={styles.monthRow}>
                        <Pressable
                            style={styles.arrowButton}
                            onPress={previousMonth}
                            accessibilityLabel="Previous month"
                            accessibilityRole="button"
                        >
                            <Text style={styles.arrow}>
                                ‹
                            </Text>
                        </Pressable>

                        <Text style={styles.monthTitle}>
                            {monthTitle}
                        </Text>

                        <Pressable
                            style={styles.arrowButton}
                            onPress={nextMonth}
                            accessibilityLabel="Next month"
                            accessibilityRole="button"
                        >
                            <Text style={styles.arrow}>
                                ›
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.calendar}>
                        {weekDays.map((day, index) => (
                            <View
                                key={`week-${index}`}
                                style={styles.dayBox}
                            >
                                <Text style={styles.weekDay}>
                                    {day}
                                </Text>
                            </View>
                        ))}

                        {days.map((day, index) => {
                            const validDay = day > 0 && day <= daysInMonth;

                            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            const selected = validDay && date === selectedDate;

                            return (
                                <View
                                    key={`day-${index}`}
                                    style={styles.dayBox}
                                >
                                    {validDay && (
                                        <Pressable
                                            style={[
                                                styles.dayButton,
                                                selected && styles.selectedDay,
                                            ]}
                                            onPress={() => setSelectedDate(date)}
                                            accessibilityRole="button"
                                            accessibilityLabel={date}
                                            accessibilityState={{ selected }}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    selected && styles.selectedText,
                                                ]}
                                            >
                                                {day}
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.selectedView}>
                        <Text style={styles.label}>
                            Selected date
                        </Text>

                        <Text style={styles.selectedDate}>
                            {selectedDate === ''
                                ? 'Choose a date'
                                : new Date(
                                    `${selectedDate}T12:00:00`
                                ).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                        </Text>
                    </View>

                    <View style={styles.buttons}>
                        <AppButton
                            title="Apply"
                            onPress={applyDate}
                            disabled={selectedDate === ''}
                        />

                        {onClear && (
                            <AppButton
                                title="Clear filter"
                                variant="text"
                                onPress={() => {
                                    onClear();
                                    onClose();
                                }}
                            />
                        )}

                        <AppButton
                            title="Cancel"
                            variant="text"
                            onPress={onClose}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        gap: 12,
    },
    title: {
        color: '#172B28',
        fontSize: 22,
        fontWeight: '600',
    },
    monthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    arrowButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        color: '#123E35',
        fontSize: 30,
    },
    monthTitle: {
        flex: 1,
        color: '#172B28',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    calendar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayBox: {
        width: '14.285714%',
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },
    weekDay: {
        color: '#697875',
        fontSize: 12,
    },
    dayButton: {
        width: '100%',
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        backgroundColor: '#123E35',
    },
    dayText: {
        color: '#172B28',
        fontSize: 14,
    },
    selectedText: {
        color: '#FFFFFF',
    },
    selectedView: {
        gap: 6,
    },
    label: {
        color: '#697875',
        fontSize: 12,
    },
    selectedDate: {
        color: '#172B28',
        fontSize: 15,
    },
    buttons: {
        gap: 4,
    },
});
