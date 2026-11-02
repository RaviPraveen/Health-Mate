import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

import Logo from '../components/Logo';
import AppInput from '../components/AppInput';
import PasswordInput from '../components/PasswordInput';
import AppButton from '../components/AppButton';

type LoginNavigation = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

export default function Login() {
    const navigation = useNavigation<LoginNavigation>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <View>
                <Logo />
            </View>

            <View style={styles.heading1}>
                <Text style={styles.heading}>
                    Welcome back
                </Text>
            </View>

            <View style={styles.heading2}>
                <Text style={styles.heading2Text}>
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
                        onForgotPress={() => {
                            Keyboard.dismiss();
                            setError(
                                'Password recovery will be added later.'
                            );
                        }}
                    />
                </View>
            </View>

            <View style={styles.buttonsView}>
                <View>
                    <AppButton
                        title="Log in"
                        onPress={checkForm}
                    />
                </View>

                <View>
                    <AppButton
                        title="Create an account"
                        variant="outline"
                        onPress={() => navigation.navigate('Register')}
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
    heading1: {
        marginTop: 4,
    },
    heading: {
        color: '#172B28',
        fontSize: 28,
        fontWeight: '600',
    },
    heading2: {
        marginBottom: 4,
    },
    heading2Text: {
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
    buttonsView: {
        gap: 20,
    },
    error: {
        color: '#B42318',
        fontSize: 14,
    },
});
