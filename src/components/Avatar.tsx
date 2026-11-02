import { StyleSheet, Text, View, Image } from 'react-native';

type Props = {
    name: string;
    photoUri?: string;
    size?: number;
};

export default function Avatar({
    name,
    photoUri = '',
    size = 48,
}: Props) {
    return (
        <View
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            {photoUri !== '' ? (
                <Image
                    source={{ uri: photoUri }}
                    style={styles.image}
                />
            ) : (
                <Text
                    style={[
                        styles.letter,
                        { fontSize: size * 0.4 },
                    ]}
                >
                    {name.trim().charAt(0).toUpperCase() || '?'}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#E8F4EF',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    letter: {
        color: '#106B5C',
        fontWeight: '600',
    },
});
