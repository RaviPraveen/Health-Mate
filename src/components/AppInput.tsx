import { StyleSheet, Text, View, TextInput } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    editable?: boolean;
    hint?: string;
    error?: string;
};

export default function AppInput({
    label,
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
    autoCapitalize = 'none',
    editable = true,
    hint = '',
    error = '',
}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>
                    {label}
                </Text>
            </View>

            <View>
                <TextInput
                    style={[
                        styles.input,
                        error !== '' && styles.errorInput,
                    ]}
                    value={value}
                    accessibilityLabel={label}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#697875"
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                    editable={editable}
                />
            </View>

            {hint !== '' && (
                <View>
                    <Text style={styles.hint}>
                        {hint}
                    </Text>
                </View>
            )}

            {error !== '' && (
                <View>
                    <Text style={styles.error}>
                        {error}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        minHeight: 84,
    },
    label: {
        color: '#172B28',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    input: {
        minHeight: 52,
        backgroundColor: '#F3F7F5',
        borderColor: '#E3EAE7',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#172B28',
        fontSize: 16,
        lineHeight: 22,
    },
    errorInput: {
        borderColor: '#B93232',
    },
    hint: {
        color: '#697875',
        fontSize: 12,
        lineHeight: 18,
    },
    error: {
        color: '#B93232',
        fontSize: 12,
        lineHeight: 18,
    },
});
