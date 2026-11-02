import { StyleSheet, Text, View, Pressable } from 'react-native';
import AppInput from './AppInput';

type Props = {
    date: string;
    steps: string;
    calories: string;
    water: string;
    onDatePress: () => void;
    onStepsChange: (text: string) => void;
    onCaloriesChange: (text: string) => void;
    onWaterChange: (text: string) => void;
    stepsError?: string;
    caloriesError?: string;
    waterError?: string;
};

export default function HealthRecordForm({
    date,
    steps,
    calories,
    water,
    onDatePress,
    onStepsChange,
    onCaloriesChange,
    onWaterChange,
    stepsError = '',
    caloriesError = '',
    waterError = '',
}: Props) {
    return (
        <View style={styles.form}>
            <View style={styles.dateView}>
                <View>
                    <Text style={styles.label}>
                        Date
                    </Text>
                </View>

                <Pressable
                    style={styles.dateInput}
                    onPress={onDatePress}
                    accessibilityRole="button"
                >
                    <Text style={styles.dateText}>
                        {date}
                    </Text>
                </Pressable>
            </View>

            <View>
                <AppInput
                    label="Steps walked"
                    value={steps}
                    onChangeText={onStepsChange}
                    keyboardType="number-pad"
                    placeholder="Enter steps"
                    error={stepsError}
                />
            </View>

            <View>
                <AppInput
                    label="Calories burned (kcal)"
                    value={calories}
                    onChangeText={onCaloriesChange}
                    keyboardType="number-pad"
                    placeholder="Enter calories"
                    error={caloriesError}
                />
            </View>

            <View>
                <AppInput
                    label="Water intake (ml)"
                    value={water}
                    onChangeText={onWaterChange}
                    keyboardType="number-pad"
                    placeholder="Enter water intake"
                    error={waterError}
                />
            </View>

            <View>
                <Text style={styles.hint}>
                    Saving an existing date updates that day’s record.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    dateView: {
        gap: 8,
    },
    label: {
        color: '#172B28',
        fontSize: 14,
    },
    dateInput: {
        minHeight: 50,
        backgroundColor: '#F3F7F5',
        borderColor: '#E3EAE7',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        justifyContent: 'center',
    },
    dateText: {
        color: '#172B28',
        fontSize: 16,
    },
    hint: {
        color: '#697875',
        fontSize: 12,
        lineHeight: 18,
    },
});
