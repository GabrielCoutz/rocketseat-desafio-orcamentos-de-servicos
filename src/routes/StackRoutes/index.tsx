import Home from '@/screens/Home';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

type IStackRoutes = {
  home: undefined;
  budget: undefined | { id: string };
};

const Stack = createNativeStackNavigator<IStackRoutes>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='home' component={Home} />
      {/* <Stack.Screen name='budget' component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}
