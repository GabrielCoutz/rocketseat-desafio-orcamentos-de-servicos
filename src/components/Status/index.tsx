import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusTag } from '@/components/StatusTag';
import { useEffect, useState } from 'react';
import { RadioButton } from '@/components/RadioButton';
import { IBudgetStatus } from '@/types/budget';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';

export const Status = ({
  budget,
  handleChangeBudgetData,
}: IChangeBudgetPropsHandlers) => {
  const [filters, setFilters] = useState<Record<IBudgetStatus, boolean>>({
    pending: false,
    sended: false,
    approved: false,
    rejected: false,
  });

  useEffect(() => {
    if (!budget?.status) return;

    setFilters({
      pending: false,
      sended: false,
      approved: false,
      rejected: false,
      [budget.status]: true,
    });
  }, [budget?.status]);

  const handleSelectFilter = (selectedFilter: IBudgetStatus) => {
    handleChangeBudgetData(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        status: selectedFilter,
      };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name='bookmark-border' size={16} color='#6A46EB' />

        <Text style={styles.headerText}>Status</Text>
      </View>

      <View style={styles.content}>
        {(Object.keys(filters) as IBudgetStatus[]).map(status => (
          <RadioButton
            key={status}
            checked={filters[status]}
            label={<StatusTag status={status} />}
            onPress={() => handleSelectFilter(status)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#676767',
  },
  content: {
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
