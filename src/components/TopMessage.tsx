import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    message: string;
    type?: 'success' | 'error';
    onFinish: () => void;
};

export default function TopMessage({
    message,
    type = 'success',
    onFinish,
}: Props) {
    const insets = useSafeAreaInsets();
    const finish = useRef(onFinish);

    useEffect(() => {
        finish.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        if (message === '') {
            return;
        }

        const timer = setTimeout(() => {
            finish.current();
        }, 2000);

        return () => clearTimeout(timer);
    }, [message]);

    if (message === '') {
        return null;
    }

    return (
        <View
            pointerEvents="none"
            style={[
                styles.messageBox,
                { top: insets.top + 8 },
                type === 'error' && styles.errorBox,
            ]}
            accessibilityLiveRegion="polite"
        >
            <Text style={styles.message}>
                {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    messageBox: {
        position: 'absolute',
        left: 16,
        right: 16,
        backgroundColor: '#106B5C',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        zIndex: 100,
        elevation: 8,
    },
    errorBox: {
        backgroundColor: '#B42318',
    },
    message: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 20,
    },
});
