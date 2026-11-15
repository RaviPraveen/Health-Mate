import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'text' | 'redText' | 'delete';
    disabled?: boolean;
    height?: number;
};

export default function AppButton({title,onPress,variant = 'primary',disabled = false,height = 52,
}: Props) {
    return (
        <Pressable
            style={[
                styles.Button1,
                { minHeight: height },
                variant === 'outline' && styles.Button2,
                (variant === 'text' || variant === 'redText') && styles.Button3,
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
                    variant === 'redText' && styles.redText,
                    disabled && styles.disabledText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    Button1: {
        minHeight: 52,
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
        borderColor: '#000000',
    },
    Button3: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    deleteButton: {
        backgroundColor: '#B93232',
        borderColor: '#B93232',
    },
    ButtonText1: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
    ButtonText2: {
        color: '#123E35',
    },
    redText: {
        color: '#B93232',
    },
    disabledButton: {
        backgroundColor: '#E3EAE7',
        borderColor: '#E3EAE7',
    },
    disabledText: {
        color: '#697875',
    },
});
