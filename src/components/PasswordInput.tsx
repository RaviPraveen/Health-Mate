import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    hint?: string;
    error?: string;
};

export default function PasswordInput({
    label,
    value,
    onChangeText,
    placeholder = 'Enter your password',
    hint = '',
    error = '',
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>
                    {label}
                </Text>
            </View>

            <View
                style={[
                    styles.passwordBox,
                    error !== '' && styles.errorInput,
                ]}
            >
                <TextInput
                    style={styles.passwordInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#697875"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Pressable
                    style={
                        showPassword
                            ? styles.unshowbutton
                            : styles.showbutton
                    }
                    onPress={() => setShowPassword(!showPassword)}
                    accessibilityRole="button"
                    accessibilityLabel={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                >
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                        <Path
                            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                            fill="none"
                            stroke="#172B28"
                            strokeWidth={1.8}
                        />

                        <Circle
                            cx={12}
                            cy={12}
                            r={3}
                            fill="none"
                            stroke="#172B28"
                            strokeWidth={1.8}
                        />

                        {showPassword && (
                            <Path
                                d="M4 4L20 20"
                                stroke="#172B28"
                                strokeWidth={1.8}
                            />
                        )}
                    </Svg>
                </Pressable>
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
    passwordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        backgroundColor: '#F3F7F5',
        borderColor: '#E3EAE7',
        borderWidth: 1,
        borderRadius: 12,
        paddingRight: 4,
    },
    passwordInput: {
        flex: 1,
        minWidth: 0,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#172B28',
        fontSize: 16,
    },
    showbutton: {
        padding: 12,
    },
    unshowbutton: {
        padding: 12,
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
