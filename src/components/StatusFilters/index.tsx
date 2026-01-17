import { Checkbox } from '@/components/Checkbox';
import { IBudgetStatus, StatusTag } from '@/components/StatusTag';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StatusFilters = () => {
  const [filters, setFilters] = useState<Record<IBudgetStatus, boolean>>({
    pending: false,
    sended: false,
    approved: false,
    rejected: false,
  });

  return (
    <View>
      <Text style={styles.text}>Status</Text>

      <View style={styles.tagsContainer}>
        {(Object.keys(filters) as IBudgetStatus[]).map(status => (
          <Checkbox
            key={status}
            checked={filters[status]}
            label={<StatusTag status={status} />}
            onPress={() =>
              setFilters(prev => ({
                ...prev,
                [status]: !prev[status],
              }))
            }
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
