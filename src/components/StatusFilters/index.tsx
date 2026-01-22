import { Checkbox } from '@/components/Checkbox';
import { StatusTag } from '@/components/StatusTag';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IBudgetStatus } from '@/types/budget';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StatusFilters = () => {
  const { getBudgetFiltersFromLocalStorage, saveBudgetFiltersInLocalStorage } =
    useLocalStorage();

  const [filters, setFilters] = useState<Record<IBudgetStatus, boolean>>({
    pending: false,
    sended: false,
    approved: false,
    rejected: false,
  });

  const handlePress = (status: IBudgetStatus) => {
    setFilters(prev => ({
      ...prev,
      [status]: !prev[status],
    }));

    const selectedStatuses = Object.keys(filters).filter(statusKey =>
      statusKey === status
        ? !filters[status]
        : filters[statusKey as IBudgetStatus]
    ) as IBudgetStatus[];

    saveBudgetFiltersInLocalStorage({
      status: selectedStatuses,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const loadFilters = async () => {
        const storedFilters = await getBudgetFiltersFromLocalStorage();

        if (!storedFilters?.status) return;

        const statusFiltersArray = storedFilters.status;

        const statusFiltersRecord = (
          Object.keys(filters) as IBudgetStatus[]
        ).reduce(
          (acc, status) => {
            acc[status] = statusFiltersArray.includes(status);

            return acc;
          },
          {} as Record<IBudgetStatus, boolean>
        );

        setFilters(statusFiltersRecord);
      };

      loadFilters();
    }, [])
  );

  return (
    <View>
      <Text style={styles.text}>Status</Text>

      <View style={styles.tagsContainer}>
        {(Object.keys(filters) as IBudgetStatus[]).map(status => (
          <Checkbox
            key={status}
            checked={filters[status]}
            label={<StatusTag status={status} />}
            onPress={() => handlePress(status)}
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
  tagsContainer: {
    gap: 12,
    marginTop: 16,
  },
});
