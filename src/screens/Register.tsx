import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

import Logo from '../components/Logo';
import AppInput from '../components/AppInput';
import PasswordInput from '../components/PasswordInput';
import AppButton from '../components/AppButton';

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
            <View>
                <Logo />
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
                    <AppInput
                        label="Full name"
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your full name"
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.emailView}>
                    <AppInput
                        label="Email address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="example@gmail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.passwordView}>
                    <PasswordInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        hint="Use 8 or more characters, including a number."
                    />
                </View>

                <View style={styles.confirmPasswordView}>
                    <PasswordInput
                        label="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your password"
                    />
                </View>
            </View>

            <View style={styles.buttonsView}>
                <View>
                    <AppButton
                        title="Create account"
                        onPress={checkForm}
                    />
                </View>

                <View>
                    <AppButton
                        title="Already registered? Log in"
                        variant="text"
                        onPress={() => navigation.navigate('Login')}
                    />
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
    buttonsView: {
        gap: 12,
    },
    error: {
        color: '#B42318',
        fontSize: 14,
    },
});
