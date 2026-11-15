import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

type Props = {
    title: string;description?: string;  onBack?: () => void;
    titleSize?: number;
};

export default function PageHeader({
    title,description = '', onBack, titleSize,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={[styles.headingView, onBack && styles.backHeading]}>
                {onBack && (
                    <Pressable
                        style={styles.backButton}
                        onPress={onBack}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <Image
                            source={require('../../assets/back.png')}
                            style={styles.backIcon}
                        />
                    </Pressable>
                )}

                <View style={styles.titleView}>
                    <Text style={[
                        styles.title,
                        !onBack && styles.pageTitle,
                        titleSize !== undefined && { fontSize: titleSize },
                    ]}>
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
        gap: 20,
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    backButton: {
        minWidth: 48,
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        width: 8,
        height: 14,
        resizeMode: 'contain',
    },
    titleView: {
        flex: 1,
    },
    title: {
        color: '#172B28',
        fontSize: 22,
        lineHeight: 30,
        fontWeight: '600',
    },
    description: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 20,
    },
    pageTitle: {
        fontSize: 26,
        lineHeight: 34,
    },
    backHeading: {
        minHeight: 56,
    },
});
