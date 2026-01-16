import { BudgetItem } from '@/components/BudgetItem';
import { FlatList } from 'react-native';

export const BudgetsList = () => {
  return (
    <FlatList
      data={Array.from({ length: 40 })}
      renderItem={({ index }) => <BudgetItem key={index} />}
      contentContainerStyle={{
        paddingBottom: 20,
        gap: 8,
      }}
      style={{
        paddingHorizontal: 20,
      }}
    />
  );
};
