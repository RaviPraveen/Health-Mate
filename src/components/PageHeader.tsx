import { StyleSheet, Text, View, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    title: string;description?: string;  onBack?: () => void;
};

export default function PageHeader({
    title,description = '', onBack,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.headingView}>
                {onBack && (
                    <Pressable
                        style={styles.backButton}
                        onPress={onBack}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <Svg width={24} height={24} viewBox="0 0 24 24">
                            <Path
                                d="M14 6L8 12L14 18"
                                fill="none"
                                stroke="#172B28"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </Pressable>
                )}

                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </View>

            {description !== '' && (
                <View>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        minWidth: 44,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleView: {
        flex: 1,
    },
    title: {
        color: '#172B28',
        fontSize: 22,
        fontWeight: '600',
    },
    description: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 21,
    },
});
