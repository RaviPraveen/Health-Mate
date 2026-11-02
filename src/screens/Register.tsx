import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard,Image } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type RegisterNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export default function Register() {
  const navigation = useNavigation<RegisterNavigation>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  function checkForm() {
    if (name.trim() === '') {
      setError('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8 || !/[0-9]/.test(password)) {
      setError('Use 8 or more characters, including a number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
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

      <View style={styles.headingText}>
        <Text style={styles.heading1}>
          Create your account
        </Text>
      </View>

      <View style={styles.headingText2}>
        <Text style={styles.heading2}>
          A little consistency starts here.
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
        <View style={styles.nameView}>
          <View>
            <Text style={styles.label}>
              Full name
            </Text>
          </View>

          <View>
            <TextInput
              style={styles.nameInput}
              placeholder="enter your full name"
              placeholderTextColor="#697875"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.emailView}>
          <View>
            <Text style={styles.label}>
              Email address
            </Text>
          </View>

          <View>
            <TextInput
              style={styles.emailInput}
              placeholder="example@gmail.com"
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
          <View>
            <Text style={styles.label}>
              Password
            </Text>
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

          <View>
            <Text style={styles.passwordHint}>
              Use 8 or more characters, including a number.
            </Text>
          </View>
        </View>

        <View style={styles.confirmPasswordView}>
          <View>
            <Text style={styles.label}>
              Confirm password
            </Text>
          </View>

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.confirmPasswordInput}
              placeholder="Confirm your password"
              placeholderTextColor="#697875"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              style={
                showConfirm
                  ? styles.unshowbutton
                  : styles.showbutton
              }
              onPress={() => setShowConfirm(!showConfirm)}
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

                {showConfirm && (
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
              Create account
            </Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={styles.Button2}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.ButtonText2}>
              Already registered? Log in
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
  headingText: {
    marginTop: 4,
  },
  heading1: {
    color: '#172B28',
    fontSize: 28,
    fontWeight: '600',
  },
  headingText2: {
    marginBottom: 4,
  },
  heading2: {
    color: '#697875',
    fontSize: 14,
  },
  form: {
    gap: 20,
  },
  nameView: {
    gap: 8,
  },
  emailView: {
    gap: 8,
  },
  passwordView: {
    gap: 8,
  },
  confirmPasswordView: {
    gap: 8,
  },
  label: {
    color: '#172B28',
    fontSize: 14,
  },
  nameInput: {
    height: 50,
    backgroundColor: '#F3F7F5',
    borderColor: '#E3EAE7',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#172B28',
    fontSize: 16,
  },
  emailInput: {
    height: 50,
    backgroundColor: '#F3F7F5',
    borderColor: '#E3EAE7',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#172B28',
    fontSize: 16,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F3F7F5',
    borderColor: '#E3EAE7',
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 6,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    color: '#172B28',
    fontSize: 16,
  },
  confirmPasswordInput: {
    flex: 1,
    height: 48,
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
  showbuttonText: {
    color: '#106B5C',
    fontSize: 12,
    fontWeight: '600',
  },
  passwordHint: {
    color: '#697875',
    fontSize: 12,
    lineHeight: 18,
  },
  buttonsView: {
    gap: 12,
  },
  Button1: {
    backgroundColor: '#123E35',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  Button2: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText2: {
    color: '#106B5C',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: '#B42318',
    fontSize: 14,
  },
});
