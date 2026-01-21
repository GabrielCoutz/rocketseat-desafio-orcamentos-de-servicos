import { StatusTag } from '@/components/StatusTag';
import { IQuoteDoc } from '@/types/budget';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IBudgetItemProps {
  item: IQuoteDoc;
}

export const BudgetItem = ({ item }: IBudgetItemProps) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigate('details', {
          id: item.id,
        })
      }
    >
      <View
        style={{
          flex: 1,
          flexShrink: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title} numberOfLines={2}>
          {item.title || 'Sem título'}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.client || 'Cliente não informado'}
        </Text>
      </View>

      <View
        style={{
          alignSelf: 'center',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <StatusTag status={item.status} />

        <Text style={styles.price}>
          <Text style={styles.currency}>R$</Text>{' '}
          {item?.items?.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    backgroundColor: '#FAFAFA',
    height: 104,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#4A4A4A',
  },
  currency: { color: '#0F0F0F', fontSize: 12, fontWeight: 'regular' },
  price: {
    color: '#0F0F0F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
