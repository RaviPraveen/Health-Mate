import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupDatabase } from './src/database/database';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/Home';
import AddRecordScreen from './src/screens/AddRecord';
import HistoryScreen from './src/screens/History';
import DailyRecordScreen from './src/screens/DailyRecord';
import EditRecordScreen from './src/screens/EditRecord';
import GoalsScreen from './src/screens/Goals';
import EditGoalsScreen from './src/screens/EditGoals';

export type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
    AddRecord: undefined;
    History: undefined;
    DailyRecord: { id: number };
    EditRecord: { id: number };
    Goals: undefined;
    EditGoals: undefined;
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
            name="Home"
            component={HomeScreen}
          
          />
          <Stack.Screen
            name="AddRecord"
            component={AddRecordScreen}
          />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="DailyRecord" component={DailyRecordScreen} />
          <Stack.Screen name="EditRecord" component={EditRecordScreen} />
          <Stack.Screen name="Goals" component={GoalsScreen} />
          <Stack.Screen name="EditGoals" component={EditGoalsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
