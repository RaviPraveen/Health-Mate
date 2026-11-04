import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    active: 'Home' | 'History';
    onHome?: () => void;
    onHistory?: () => void;
};

export default function NavBar({ active, onHome, onHistory }: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.navbar,
                { paddingBottom: insets.bottom + 9 },
            ]}
        >
            <Pressable
                style={styles.navButton}
                onPress={onHome}
                disabled={!onHome}
                accessibilityRole="tab"
                accessibilityState={{
                    selected: active === 'Home',
                    disabled: !onHome,
                }}
            >
                <View
                    style={[
                        styles.iconBox,
                        active === 'Home' && styles.activeIconBox,
                    ]}
                >
                    <Image
                        source={require('../../assets/Home.png')}
                        style={styles.icon}
                    />
                </View>

                <View>
                    <Text
                        style={[
                            styles.navText,
                            active === 'Home' && styles.activeText,
                        ]}
                    >
                        Home
                    </Text>
                </View>
            </Pressable>

            <Pressable
                style={styles.navButton}
                onPress={onHistory}
                disabled={!onHistory}
                accessibilityRole="tab"
                accessibilityState={{
                    selected: active === 'History',
                    disabled: !onHistory,
                }}
            >
                <View
                    style={[
                        styles.iconBox,
                        active === 'History' && styles.activeIconBox,
                    ]}
                >
                    <Image
                        source={require('../../assets/History.png')}
                        style={styles.icon}
                    />
                </View>

                <View>
                    <Text
                        style={[
                            styles.navText,
                            active === 'History' && styles.activeText,
                        ]}
                    >
                        History
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 9,
        paddingHorizontal: 8,
        shadowColor: '#123D33',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 4,
    },
    navButton: {
        flex: 1,
        minHeight: 61,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        gap: 4,
    },
    iconBox: {
        width: 52,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIconBox: {
        backgroundColor: '#E9F5F0',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    navText: {
        color: '#697875',
        fontSize: 12,
        lineHeight: 17,
        fontWeight: '500',
        textAlign: 'center',
    },
    activeText: {
        color: '#106B5C',
        fontWeight: '600',
    },
});
