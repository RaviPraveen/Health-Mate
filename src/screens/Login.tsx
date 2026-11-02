import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard, Image } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type LoginNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {
  const navigation = useNavigation<LoginNavigation>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function checkForm() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password === '') {
      setError('Please enter your password.');
      return;
    }

    setError('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{ width: 32, height: 32, marginRight: 8 }}
        />
        <Text style={styles.logoname}>
          HealthMate
        </Text>
      </View>

      <View style={styles.headingView}>
        <Text style={styles.heading}>
          Welcome back
        </Text>
      </View>

      <View style={styles.descriptionView}>
        <Text style={styles.description}>
          Log in to pick up where you left off.
        </Text>
      </View>

      {error !== '' && (
        <View>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.emailView}>
          <View>
            <Text style={styles.label}>
              Email address
            </Text>
          </View>

          <View>
            <TextInput
              style={styles.emailInput}
              placeholder="praveen@example.com"
              placeholderTextColor="#697875"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.passwordView}>
          <View style={styles.passwordLabel}>
            <View>
              <Text style={styles.label}>
                Password
              </Text>
            </View>

            <View>
              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotPassword}>
                  Forgot password?
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#697875"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              style={
                showPassword
                  ? styles.unshowbutton
                  : styles.showbutton
              }
              onPress={() => setShowPassword(!showPassword)}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                  fill="none"
                  stroke="#172B28"
                  strokeWidth={1.8}
                />

                <Circle
                  cx={12}
                  cy={12}
                  r={3}
                  fill="none"
                  stroke="#172B28"
                  strokeWidth={1.8}
                />

                {showPassword && (
                  <Path
                    d="M4 4L20 20"
                    stroke="#172B28"
                    strokeWidth={1.8}
                  />
                )}
              </Svg>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.buttonsView}>
        <View>
          <Pressable
            style={styles.Button1}
            onPress={checkForm}
          >
            <Text style={styles.ButtonText1}>
              Log in
            </Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={styles.Button2}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.ButtonText2}>
              Create an account
            </Text>
          </Pressable>
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
    gap: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoname: {
    color: '#123E35',
    fontSize: 24,
    fontWeight: '600',
  },
  headingView: {
    marginTop: 4,
  },
  heading: {
    color: '#172B28',
    fontSize: 28,
    fontWeight: '600',
  },
  descriptionView: {
    marginBottom: 4,
  },
  description: {
    color: '#697875',
    fontSize: 14,
  },
  form: {
    marginTop: 32,
    gap: 24,
  },
  emailView: {
    gap: 8,
  },
  passwordView: {
    gap: 8,
  },
  passwordLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#172B28',
    fontSize: 14,
  },
  emailInput: {
    height: 56,
    backgroundColor: '#F3F7F5',
    borderColor: '#E3EAE7',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    color: '#172B28',
    fontSize: 16,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#F3F7F5',
    borderColor: '#E3EAE7',
    borderWidth: 1,
    borderRadius: 16,
    paddingRight: 6,
  },
  passwordInput: {
    flex: 1,
    height: 54,
    paddingHorizontal: 14,
    color: '#172B28',
    fontSize: 16,
  },
  showbutton: {
    padding: 10,
  },
  unshowbutton: {
    padding: 10,
  },
  forgotPassword: {
    color: '#106B5C',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonsView: {
    gap: 20,
  },
  Button1: {
    backgroundColor: '#123E35',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  Button2: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 16,
    borderColor: '#E3EAE7',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText2: {
    color: '#106B5C',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#B42318',
    fontSize: 14,
  },
});
