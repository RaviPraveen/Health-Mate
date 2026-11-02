import { StyleSheet, Text, View, Image } from 'react-native';

export default function Logo() {
    return (
        <View style={styles.logo}>
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logoImage}
            />

            <Text style={styles.logoname}>
                HealthMate
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    logoname: {
        color: '#123E35',
        fontSize: 24,
    },
});
