import { StyleSheet, Text, View,Image } from 'react-native';

export default function AccountCreated() {
  return (
    <View style={styles.container}>
      <View style={styles.successView}>
        <View style={styles.successIcon}>
          <Image
            source={require('../../assets/Success.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>

        <View style={styles.successText}>
          <Text style={styles.heading}>
            Your account Is Created
          </Text>
        </View>

        <View style={styles.welcomeText}>
          <Text style={styles.welcomeText2}>
            Welcome To HealthMate
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  successView: {
    alignItems: 'center',
    marginBottom: 160,
  },
  successIcon: {
    marginBottom: 20,
  },
  successText: {
    marginBottom: 12,
  },
  heading: {
    color: '#172B28',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  welcomeText: {
    alignItems: 'center',
  },
  welcomeText2: {
    color: '#454545',
    fontSize: 16,
    textAlign: 'center',
  },
});
