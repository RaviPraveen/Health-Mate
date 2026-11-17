import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    message: string; type?: 'success' | 'error';  onFinish: () => void;
    autoHide?: boolean;
    inline?: boolean;
};

export default function TopMessage({
    message,  type = 'success', onFinish, autoHide = true, inline = false,
}: Props) {
    const insets = useSafeAreaInsets();
    const finish = useRef(onFinish);

    useEffect(() => {
        finish.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        if (message === '' || !autoHide) {
            return;
        }

        const timer = setTimeout(() => {
            finish.current();
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, autoHide]);

    if (message === '') {
        return null;
    }

    return (
        <View
            pointerEvents="none"
            style={[
                styles.messageBox,
                { top: insets.top + 8 },
                inline && styles.inlineBox,
                type === 'error' && styles.errorBox,
            ]}
            accessibilityLiveRegion={type === 'error' ? 'assertive' : 'polite'}
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
        backgroundColor: '#B93232',
    },
    inlineBox: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
    },
    message: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 20,
    },
});
