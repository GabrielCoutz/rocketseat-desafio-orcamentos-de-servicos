import { Checkbox } from '@/components/Checkbox';
import { StatusTag } from '@/components/StatusTag';
import { IBudgetStatus } from '@/types/budget';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StatusFilters = () => {
  const { setParams } = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'filter'>>();

  const filterFromParam = params?.status;

  const [filters, setFilters] = useState<Record<IBudgetStatus, boolean>>({
    pending: filterFromParam?.includes('pending') ?? false,
    sended: filterFromParam?.includes('sended') ?? false,
    approved: filterFromParam?.includes('approved') ?? false,
    rejected: filterFromParam?.includes('rejected') ?? false,
  });

  const handlePress = (status: IBudgetStatus) => {
    setFilters(prev => ({
      ...prev,
      [status]: !prev[status],
    }));
    setParams({
      status: filterFromParam?.includes(status)
        ? filterFromParam.filter((s: IBudgetStatus) => s !== status)
        : [...(filterFromParam || []), status],
    });
  };

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
