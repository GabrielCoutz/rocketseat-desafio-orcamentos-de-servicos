import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';
import { IQuoteDocItem } from '@/types/budget';

interface IServiceItemProps extends IChangeBudgetPropsHandlers {
  item: IQuoteDocItem;
}

export const ServiceItem = ({ budget, item }: IServiceItemProps) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text numberOfLines={1} style={styles.title}>
          {item?.title || 'Sem título'}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {item?.description || 'Sem descrição'}
        </Text>
      </View>

      <View>
        <Text style={styles.price}>
          <Text style={styles.currency}>R$ </Text>
          {item?.price}
        </Text>
        <Text style={styles.quantity}>Qt: {item?.qty}</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigate('service', { budgetId: budget?.id, serviceId: item?.id })
        }
      >
        <MaterialIcons name='edit' size={16} color='#6A46EB' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    justifyContent: 'space-between',
    gap: 16,
  },
  texts: {
    gap: 4,
    flexShrink: 1,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0F0F0F',
  },
  description: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#676767',
  },

  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F0F0F',
  },
  currency: {
    fontSize: 12,
    fontWeight: 'regular',
  },
  quantity: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#4A4A4A',
    textAlign: 'right',
  },
});
