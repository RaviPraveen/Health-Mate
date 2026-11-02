import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'text' | 'delete';
    disabled?: boolean;
};

export default function AppButton({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
}: Props) {
    return (
        <Pressable
            style={[
                styles.Button1,
                variant === 'outline' && styles.Button2,
                variant === 'text' && styles.Button3,
                variant === 'delete' && styles.deleteButton,
                disabled && styles.disabledButton,
            ]}
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
        >
            <Text
                style={[
                    styles.ButtonText1,
                    variant === 'outline' && styles.ButtonText2,
                    variant === 'text' && styles.ButtonText2,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    Button1: {
        minHeight: 48,
        backgroundColor: '#123E35',
        borderWidth: 1,
        borderColor: '#123E35',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Button2: {
        backgroundColor: '#FFFFFF',
        borderColor: '#DCE5E1',
    },
    Button3: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    deleteButton: {
        backgroundColor: '#B42318',
        borderColor: '#B42318',
    },
    ButtonText1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    ButtonText2: {
        color: '#123E35',
    },
    disabledButton: {
        opacity: 0.45,
    },
});
