import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HomeHeader } from '@/components/HomeHeader';
import { Input } from '@/components/Input';
import { MaterialIcons } from '@expo/vector-icons';
import { BudgetsList } from '@/components/BudgetsList';

import { IStackRouteProps } from '@/routes/StackRoutes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home({ navigation }: IStackRouteProps<'home'>) {
  const { saveBudgetFiltersInLocalStorage } = useLocalStorage();
  return (
    <View style={homeStyles.container}>
      <HomeHeader />

      <View style={homeStyles.actionsContainer}>
        <Input
          placeholder='Título ou cliente'
          icon={<MaterialIcons name='search' size={24} color='#4A4A4A' />}
          iconPosition='left'
          onChangeText={async value =>
            await saveBudgetFiltersInLocalStorage({ search: value })
          }
        />

        <TouchableOpacity
          style={homeStyles.filterButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('filter')}
        >
          <MaterialIcons name='filter-list' size={24} color='#6A46EB' />
        </TouchableOpacity>
      </View>

      <BudgetsList />
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 20,
  },
  filterButton: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E6E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
});
