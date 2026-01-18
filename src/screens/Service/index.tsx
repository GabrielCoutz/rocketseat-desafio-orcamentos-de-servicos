import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { IQuoteDocItem } from '@/types/budget';
import { RootStackParamList } from '@/types/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function Service() {
  const { goBack } = useNavigation();
  const [service, setService] = useState<IQuoteDocItem | null>(null);
  const { params } = useRoute<RouteProp<RootStackParamList, 'service'>>();
  const {
    getBudgetServiceItemFromLocalStorage,
    saveBudgetServiceItemInLocalStorage,
    deleteBudgetServiceItemFromLocalStorage,
  } = useLocalStorage();

  useEffect(() => {
    const fetchBudget = async () => {
      const service = await getBudgetServiceItemFromLocalStorage(
        params?.budgetId ?? '',
        params?.serviceId ?? ''
      );

      if (service) {
        setService(service);
      } else Alert.alert('Erro', 'Serviço não encontrado.');
    };

    if (params) fetchBudget();
  }, [params?.serviceId]);

  const handleIncrementQuantity = () => {
    setService(prev => ({
      ...(prev ?? ({} as IQuoteDocItem)),
      qty: (prev ?? ({} as IQuoteDocItem)).qty + 1,
    }));
  };

  const handleDecrementQuantity = () => {
    if (service && service.qty > 1)
      setService({ ...service, qty: service.qty - 1 });
  };

  const handleSave = async () => {
    await saveBudgetServiceItemInLocalStorage(
      params?.budgetId ?? '',
      service ?? ({} as IQuoteDocItem)
    );
    Alert.alert('Sucesso', 'Serviço salvo com sucesso!', [
      { text: 'OK', onPress: () => goBack() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este serviço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteBudgetServiceItemFromLocalStorage(
              params?.budgetId ?? '',
              params?.serviceId ?? ''
            );

            goBack();
          },
        },
      ]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Serviço</Text>

        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.8}
          style={styles.closeButton}
        >
          <MaterialIcons name='close' size={24} color='#4A4A4A' />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {service && (
          <>
            <Input
              value={service.title}
              placeholder='Título'
              onChangeText={text =>
                setService(prev => (prev ? { ...prev, title: text } : prev))
              }
            />

            <Input
              value={service.description}
              placeholder='Descrição'
              onChangeText={text =>
                setService(prev =>
                  prev ? { ...prev, description: text } : prev
                )
              }
            />

            <View style={styles.priceSection}>
              <View style={{ flexShrink: 1, flex: 1 }}>
                <Input
                  value={formatCurrency(service.price)}
                  placeholder='Preço'
                  keyboardType='numeric'
                  onChangeText={text => {
                    // Remove all non-numeric characters
                    const numericValue = text.replace(/[^\d]/g, '');
                    // Convert to price in cents (divide by 100)
                    const price = parseFloat(numericValue) / 100;
                    setService(prev =>
                      prev ? { ...prev, price: isNaN(price) ? 0 : price } : prev
                    );
                  }}
                />
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={handleDecrementQuantity}
                  style={styles.quantityButton}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name='remove' size={20} color='#6B46C1' />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{service.qty}</Text>

                <TouchableOpacity
                  onPress={handleIncrementQuantity}
                  style={styles.quantityButton}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name='add' size={20} color='#6B46C1' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteButton}
                activeOpacity={0.8}
              >
                <MaterialIcons name='delete' size={24} color='#EF4444' />
              </TouchableOpacity>

              <Button onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F0F0F',
  },
  descriptionCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F0F0F',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6B46C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F0F0F',
    minWidth: 24,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
