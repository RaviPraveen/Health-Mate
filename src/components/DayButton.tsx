import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
    title: string;
    selected: boolean;
    onPress: () => void;
};

export default function DayButton({
    title,
    selected,
    onPress,
}: Props) {
    return (
        <Pressable
            style={[
                styles.button,
                selected && styles.selectedButton,
            ]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected }}
        >
            <Text
                style={[
                    styles.text,
                    selected && styles.selectedText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minWidth: 40,
        minHeight: 44,
        borderRadius: 24,
        backgroundColor: '#E8F4EF',
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#123E35',
    },
    text: {
        color: '#106B5C',
        fontSize: 13,
        textAlign: 'center',
    },
    selectedText: {
        color: '#FFFFFF',
    },
});
