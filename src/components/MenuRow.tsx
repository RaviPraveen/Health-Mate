import { StyleSheet, Text, View, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    title: string;
    description?: string;
    onPress?: () => void;
};

export default function MenuRow({
    title,
    description = '',
    onPress,
}: Props) {
    return (
        <Pressable
            style={styles.row}
            onPress={onPress}
            disabled={!onPress}
            accessibilityRole={onPress ? 'button' : undefined}
        >
            <View style={styles.textView}>
                <Text style={styles.title}>
                    {title}
                </Text>

                {description !== '' && (
                    <Text style={styles.description}>
                        {description}
                    </Text>
                )}
            </View>

            {onPress && (
                <View>
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                        <Path
                            d="M9 6L15 12L9 18"
                            fill="none"
                            stroke="#172B28"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 56,
        paddingVertical: 14,
        gap: 12,
    },
    textView: {
        flex: 1,
        gap: 6,
    },
    title: {
        color: '#172B28',
        fontSize: 16,
    },
    description: {
        color: '#697875',
        fontSize: 13,
        lineHeight: 19,
    },
});
