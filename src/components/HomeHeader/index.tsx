import { Button } from '@/components/Button';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCallback, useState } from 'react';

export const HomeHeader = () => {
  const [pendingBudgetCount, setPendingBudgetCount] = useState(0);
  const { navigate } = useNavigation();
  const { createBudgetInLocalStorage, getBudgetListFromLocalStorage } =
    useLocalStorage();

  const handleCreateNewBudget = async () => {
    const createdBudget = await createBudgetInLocalStorage();

    if (!createdBudget?.id)
      return Alert.alert('Erro', 'Não foi possível criar um novo orçamento.');

    navigate('budget', {
      id: createdBudget.id,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPendingBudgets = async () => {
        const budgets = await getBudgetListFromLocalStorage();

        const pendingBudgets =
          budgets?.filter(budget => budget.status === 'pending') ?? [];

        setPendingBudgetCount(pendingBudgets?.length);
      };

      fetchPendingBudgets();
    }, [])
  );

  return (
    <View style={styles.header}>
      <View style={styles.texts}>
        <Text style={styles.headerTitle}>Orçamentos</Text>
        {!!pendingBudgetCount && (
          <Text style={styles.headerSubtitle}>
            Você tem {pendingBudgetCount} item
            {pendingBudgetCount > 1 ? 's' : ''} em rascunho
          </Text>
        )}
      </View>

      <Button onPress={handleCreateNewBudget}>
        <MaterialIcons name='add' size={24} color='#FFFFFF' />

        <Text style={styles.buttonText}>Novo</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A46EB',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#676767',
    fontWeight: 'regular',
  },
  texts: {
    gap: 2,
  },
});
