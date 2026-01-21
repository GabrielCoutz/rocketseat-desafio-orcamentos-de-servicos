import { BudgetItem } from '@/components/BudgetItem';
import { IOrderingFilters } from '@/components/OrderingFilters';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IBudgetStatus, IQuoteDoc } from '@/types/budget';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

export const BudgetsList = () => {
  const [budgetList, setBudgetList] = useState<IQuoteDoc[]>([]);
  const { getBudgetListFromLocalStorage } = useLocalStorage();
  const { params } = useRoute<RouteProp<RootStackParamList, 'home'>>();

  const filterBudgetsBySearch = (
    search: string,
    list: IQuoteDoc[]
  ): IQuoteDoc[] =>
    list.filter(
      budget =>
        budget?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
        budget?.client?.toLowerCase()?.includes(search?.toLowerCase())
    );

  const filterBudgetsByStatus = (
    status: IBudgetStatus[],
    list: IQuoteDoc[]
  ): IQuoteDoc[] =>
    list.filter(budget => status.find(s => s === budget.status));

  const filterBudgetsByOrder = (
    orderBy: IOrderingFilters,
    list: IQuoteDoc[]
  ): IQuoteDoc[] => {
    const sortFunctionsMap: Record<
      IOrderingFilters,
      (a: IQuoteDoc, b: IQuoteDoc) => number
    > = {
      newest: (a: IQuoteDoc, b: IQuoteDoc) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      oldest: (a: IQuoteDoc, b: IQuoteDoc) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      highest: (a: IQuoteDoc, b: IQuoteDoc) =>
        a.items.reduce((sum, item) => sum + item.price * item.qty, 0) -
        b.items.reduce((sum, item) => sum + item.price * item.qty, 0),
      lowest: (a: IQuoteDoc, b: IQuoteDoc) =>
        a.items.reduce((sum, item) => sum + item.price * item.qty, 0) -
        b.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    };

    return sortFunctionsMap[orderBy as keyof typeof sortFunctionsMap]
      ? list.sort(sortFunctionsMap[orderBy as keyof typeof sortFunctionsMap])
      : list;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchBudgets = async () => {
        let budgets = await getBudgetListFromLocalStorage();

        if (!budgets)
          return Alert.alert(
            'Erro',
            'Não foi possível carregar os orçamentos.'
          );

        const shouldFilterBySearch =
          params?.search && params?.search?.length > 0;
        if (shouldFilterBySearch)
          budgets = filterBudgetsBySearch(params.search || '', budgets);

        const shouldFilterByStatus = params?.status?.length;
        if (shouldFilterByStatus)
          budgets = filterBudgetsByStatus(params.status, budgets);

        const shouldOrderBy = !!params?.orderBy;
        if (shouldOrderBy)
          budgets = filterBudgetsByOrder(params.orderBy, budgets);

        setBudgetList(budgets);
      };

      fetchBudgets();
    }, [params])
  );

  return (
    <FlatList
      data={budgetList}
      keyExtractor={item => item?.id}
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
            {params?.search
              ? 'Nenhum orçamento encontrado para essa busca.'
              : 'Nenhum orçamento disponível.'}
          </Text>
        </View>
      )}
    />
  );
};
