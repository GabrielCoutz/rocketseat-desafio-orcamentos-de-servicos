import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ServiceItem } from '@/components/ServiceItem';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';
import { useNavigation } from '@react-navigation/native';

export const ServicesIncluded = ({
  budget,
  handleChangeBudgetData,
}: IChangeBudgetPropsHandlers) => {
  const { createBudgetServiceItemInLocalStorage } = useLocalStorage();
  const { navigate } = useNavigation();

  const handleAddServiceButtonPress = async () => {
    const createdService = await createBudgetServiceItemInLocalStorage(
      budget?.id ?? ''
    );

    if (!createdService?.id) return;

    navigate('service', {
      budgetId: budget?.id,
      serviceId: createdService?.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name='short-text' size={16} color='#6A46EB' />

        <Text style={styles.headerText}>Serviços inclusos</Text>
      </View>

      <View style={styles.content}>
        {budget?.items?.length ? (
          budget?.items?.map(item => (
            <ServiceItem
              key={item.id}
              budget={budget}
              handleChangeBudgetData={handleChangeBudgetData}
              item={item}
            />
          ))
        ) : (
          <Text>Nenhum serviço adicionado ainda.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.addServiceButton}
        activeOpacity={0.8}
        onPress={handleAddServiceButtonPress}
      >
        <MaterialIcons name='add' size={24} color='#6A46EB' />

        <Text style={styles.addServiceText}>Adicionar serviço</Text>
      </TouchableOpacity>
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
    flexDirection: 'column',
  },
  addServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    color: '#6A46EB',
    backgroundColor: '#FAFAFA',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E6E5E5',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  addServiceText: {
    color: '#6A46EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
