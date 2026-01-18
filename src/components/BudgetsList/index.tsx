import { BudgetItem } from '@/components/BudgetItem';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IQuoteDoc } from '@/types/budget';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export const BudgetsList = () => {
  const [budgetList, setBudgetList] = useState<IQuoteDoc[]>([]);
  const { getBudgetListFromLocalStorage } = useLocalStorage();

  useFocusEffect(
    useCallback(() => {
      const fetchBudgets = async () => {
        const budgets = await getBudgetListFromLocalStorage();

        if (budgets) setBudgetList(budgets);
      };

      fetchBudgets();
    }, [])
  );

  return (
    <FlatList
      data={budgetList}
      renderItem={({ item }) => <BudgetItem item={item} />}
      contentContainerStyle={{
        paddingBottom: 20,
        gap: 8,
      }}
      style={{
        paddingHorizontal: 20,
      }}
      ListEmptyComponent={() => (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', color: 'gray' }}>
            Não há orçamentos criados.
          </Text>
        </View>
      )}
    />
  );
};
