import { RadioButton } from '@/components/RadioButton';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type IOrderingFilters = 'newest' | 'oldest' | 'highest' | 'lowest';
export const getOrderingFilterLabel = (filter: IOrderingFilters) => {
  const labelsMap: Record<IOrderingFilters, string> = {
    newest: 'Mais novo',
    oldest: 'Mais antigo',
    highest: 'Maior valor',
    lowest: 'Menor valor',
  };

  return labelsMap[filter];
};

export const OrderingFilters = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'filter'>>();
  const { setParams } = useNavigation();
  const [filters, setFilters] = useState<Record<IOrderingFilters, boolean>>({
    newest: params?.orderBy === 'newest' || false,
    oldest: params?.orderBy === 'oldest' || false,
    highest: params?.orderBy === 'highest' || false,
    lowest: params?.orderBy === 'lowest' || false,
  });

  const handleSelectFilter = (selectedFilter: IOrderingFilters) => {
    setParams({
      orderBy: selectedFilter,
    });
    setFilters(prev =>
      Object.keys(prev).reduce(
        (acc, filter) => {
          acc[filter as IOrderingFilters] = filter === selectedFilter;

          return acc;
        },
        {} as Record<IOrderingFilters, boolean>
      )
    );
  };

  return (
    <View>
      <Text style={styles.text}>Ordenação</Text>

      <View style={{ marginTop: 16, gap: 12 }}>
        {(Object.keys(filters) as IOrderingFilters[]).map(order => (
          <RadioButton
            key={order}
            checked={filters[order]}
            label={getOrderingFilterLabel(order)}
            onPress={() => handleSelectFilter(order)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#676767',
  },
});
