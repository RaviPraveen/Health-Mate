import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { setupDatabase } from './src/database/database';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import AccountCreatedScreen from './src/screens/AccountCreated';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  AccountCreated: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    setupDatabase()
      .then(() => {
        console.log('Database ready');
      })
      .catch((error) => {
        console.error('Database setup failed:', error);
      });
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="AccountCreated"
            component={AccountCreatedScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
