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

export default function AppInput({label,value,onChangeText,placeholder = '',keyboardType = 'default',autoCapitalize = 'none',editable = true,hint = '',error = '',
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
    },
    label: {
        color: '#172B28',
        fontSize: 14,
    },
    input: {
        minHeight: 50,
        backgroundColor: '#F3F7F5',
        borderColor: '#E3EAE7',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#172B28',
        fontSize: 16,
    },
    errorInput: {
        borderColor: '#B42318',
    },
    hint: {
        color: '#697875',
        fontSize: 12,
        lineHeight: 18,
    },
    error: {
        color: '#B42318',
        fontSize: 12,
        lineHeight: 18,
    },
});
