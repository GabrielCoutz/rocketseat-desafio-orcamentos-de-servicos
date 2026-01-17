import Budget from '@/screens/Budget';
import Filter from '@/screens/Filter';
import Home from '@/screens/Home';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type IStackRoutes = {
  home: undefined;
  budget: undefined | { id: string };
  filter: undefined;
};

export type IStackRouteProps<T extends keyof IStackRoutes> =
  NativeStackScreenProps<IStackRoutes, T>;

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
      <Stack.Screen name='budget' component={Budget} />
      <Stack.Screen
        name='filter'
        component={Filter}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
}
