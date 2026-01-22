import { RadioButton } from '@/components/RadioButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
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
  const { getBudgetFiltersFromLocalStorage, saveBudgetFiltersInLocalStorage } =
    useLocalStorage();

  const [filters, setFilters] = useState<Record<IOrderingFilters, boolean>>({
    newest: false,
    oldest: false,
    highest: false,
    lowest: false,
  });

  const handleSelectFilter = (selectedFilter: IOrderingFilters) => {
    setFilters(prev =>
      Object.keys(prev).reduce(
        (acc, filter) => {
          acc[filter as IOrderingFilters] = filter === selectedFilter;

          return acc;
        },
        {} as Record<IOrderingFilters, boolean>
      )
    );

    saveBudgetFiltersInLocalStorage({
      orderBy: selectedFilter,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const loadFilters = async () => {
        const storedFilters = await getBudgetFiltersFromLocalStorage();

        if (!storedFilters?.orderBy) return;

        const orderingFilter = storedFilters.orderBy;

        const orderingFiltersRecord = (
          Object.keys(filters) as IOrderingFilters[]
        ).reduce(
          (acc, order) => {
            acc[order] = order === orderingFilter;

            return acc;
          },
          {} as Record<IOrderingFilters, boolean>
        );

        setFilters(orderingFiltersRecord);
      };

      loadFilters();
    }, [])
  );

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
