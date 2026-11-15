import { StyleSheet, Text, View, Modal } from 'react-native';
import AppButton from './AppButton';

type Props = {visible: boolean;title: string;message?: string;confirmTitle: string;onConfirm: () => void; onCancel: () => void;
};

export default function ConfirmBox({visible,title,message = '',confirmTitle,onConfirm,onCancel,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onCancel}
        >
            <View style={styles.background}>
                <View style={styles.box}>
                    <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>

                    {message !== '' && (
                        <View>
                            <Text style={styles.message}>
                                {message}
                            </Text>
                        </View>
                    )}

                    <View style={styles.buttons}>
                        <AppButton
                            title="Cancel"
                            variant="redText"
                            onPress={onCancel}
                            height={48}
                        />

                        <AppButton
                            title={confirmTitle}
                            variant="delete"
                            onPress={onConfirm}
                            height={48}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(23, 43, 40, 0.4)',
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        maxWidth: 340,
        minHeight: 268,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        gap: 16,
    },
    title: {
        color: '#172B28',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
    },
    message: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 20,
    },
    buttons: {
        gap: 16,
    },
});
