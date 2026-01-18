import { IQuoteDoc, IQuoteDocItem } from '@/types/budget';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_KEY = '@orcamentos_lista' as const;

export const useLocalStorage = () => {
  const createBudgetInLocalStorage =
    async (): Promise<Partial<IQuoteDoc> | null> => {
      try {
        const existingBudgets = await getBudgetListFromLocalStorage();

        const newBudget: Partial<IQuoteDoc> = {
          id: Math.random().toString().substring(2),
          client: '',
          title: '',
          items: [],
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          discountPct: 0,
        };

        const updatedBudgets = existingBudgets
          ? [...existingBudgets, newBudget]
          : [newBudget];

        await AsyncStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(updatedBudgets)
        );

        return newBudget;
      } catch (e) {
        console.log('error saving to local storage', e);

        return null;
      }
    };

  const createBudgetServiceItemInLocalStorage = async (
    budgetId: string
  ): Promise<IQuoteDocItem | null> => {
    try {
      const newServiceItem: IQuoteDocItem = {
        id: Math.random().toString().substring(2),
        description: '',
        title: '',
        qty: 0,
        price: 0,
      };

      const budget = await getBudgetFromLocalStorage(budgetId);
      if (!budget) throw new Error('Budget not found');

      const updatedBudget: Partial<IQuoteDoc> = {
        ...budget,
        items: [...(budget.items || []), newServiceItem],
        updatedAt: new Date().toISOString(),
      };

      await updateBudgetInLocalStorage(updatedBudget);

      return newServiceItem;
    } catch (e) {
      console.log('error saving to local storage', e);

      return null;
    }
  };

  const addBudgetInLocalStorage = async (
    value: Partial<IQuoteDoc>
  ): Promise<void> => {
    try {
      const existingBudgets = await getBudgetListFromLocalStorage();
      const updatedBudgets = existingBudgets
        ? [...existingBudgets, value]
        : [value];

      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedBudgets)
      );
    } catch (e) {
      console.log('error saving to local storage', e);
    }
  };

  const getBudgetListFromLocalStorage = async (): Promise<
    IQuoteDoc[] | null
  > => {
    try {
      const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('e reading from local storage', e);

      return null;
    }
  };

  const getBudgetFromLocalStorage = async (
    id: string
  ): Promise<IQuoteDoc | null> => {
    try {
      const existingBudgets = await getBudgetListFromLocalStorage();
      if (!existingBudgets?.length) return null;

      const budget = existingBudgets.find(budget => budget.id === id) ?? null;

      return budget;
    } catch (e) {
      console.log('error reading from local storage', e);

      return null;
    }
  };

  const getBudgetServiceItemFromLocalStorage = async (
    budgetId: string,
    itemId: string
  ): Promise<IQuoteDocItem | null> => {
    try {
      const budget = await getBudgetFromLocalStorage(budgetId);
      if (!budget?.items?.length) return null;

      const item = budget.items.find(item => item.id === itemId) ?? null;

      return item;
    } catch (e) {
      console.log('error reading from local storage', e);

      return null;
    }
  };

  const saveBudgetInLocalStorage = async (
    updatedBudget: Partial<IQuoteDoc>
  ): Promise<void> => {
    try {
      const existingBudgets = await getBudgetListFromLocalStorage();
      if (!existingBudgets?.length) return;

      const updatedBudgets = existingBudgets.map(budget =>
        budget.id === updatedBudget.id
          ? { ...budget, ...updatedBudget }
          : budget
      );

      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedBudgets)
      );
    } catch (e) {
      console.log('error updating local storage', e);
    }
  };

  const saveBudgetServiceItemInLocalStorage = async (
    budgetId: string,
    updatedItem: Partial<IQuoteDocItem>
  ): Promise<void> => {
    try {
      const budget = await getBudgetFromLocalStorage(budgetId);
      if (!budget?.items?.length) return;

      const updatedItems = budget.items.map(item =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      );

      const updatedBudget: Partial<IQuoteDoc> = {
        ...budget,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };

      await updateBudgetInLocalStorage(updatedBudget);
    } catch (e) {
      console.log('error updating local storage', e);
    }
  };

  const deleteBudgetServiceItemFromLocalStorage = async (
    budgetId: string,
    itemId: string
  ): Promise<void> => {
    try {
      const budget = await getBudgetFromLocalStorage(budgetId);
      if (!budget?.items?.length) return;

      const updatedItems = budget.items.filter(item => item.id !== itemId);

      const updatedBudget: Partial<IQuoteDoc> = {
        ...budget,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };

      await updateBudgetInLocalStorage(updatedBudget);
    } catch (e) {
      console.log('error updating local storage', e);
    }
  };

  const updateBudgetInLocalStorage = async (
    updatedBudget: Partial<IQuoteDoc>
  ): Promise<void> => {
    try {
      const existingBudgets = await getBudgetListFromLocalStorage();
      if (!existingBudgets?.length) return;

      const updatedBudgets = existingBudgets.map(budget =>
        budget.id === updatedBudget.id
          ? { ...budget, ...updatedBudget }
          : budget
      );

      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedBudgets)
      );
    } catch (e) {
      console.log('error updating local storage', e);
    }
  };

  return {
    createBudgetInLocalStorage,
    addBudgetInLocalStorage,
    getBudgetListFromLocalStorage,
    updateBudgetInLocalStorage,
    getBudgetFromLocalStorage,
    createBudgetServiceItemInLocalStorage,
    getBudgetServiceItemFromLocalStorage,
    saveBudgetServiceItemInLocalStorage,
    deleteBudgetServiceItemFromLocalStorage,
    saveBudgetInLocalStorage,
  };
};
