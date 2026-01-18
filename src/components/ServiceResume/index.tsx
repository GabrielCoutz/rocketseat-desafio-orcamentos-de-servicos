import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const ServiceResume = ({
  budget,
  handleChangeBudgetData,
}: IChangeBudgetPropsHandlers) => {
  const totalItensCount = budget?.items?.length;

  const totalPrice =
    budget?.items?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;

  const discountAmount = totalPrice * ((budget?.discountPct || 0) / 100);

  const finalPrice = totalPrice - discountAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name='credit-card' size={16} color='#6A46EB' />

        <Text style={styles.headerText}>Investimento</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <View style={styles.rightContent}>
            <Text style={styles.itemsCount}>
              {totalItensCount} ite{totalItensCount === 1 ? 'm' : 'ns'}
            </Text>
            <Text style={styles.price}>{formatCurrency(totalPrice)}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.discountLeft}>
            <Text style={styles.label}>Desconto</Text>
            <Input
              style={styles.discountInput}
              keyboardType='numeric'
              onChangeText={value =>
                handleChangeBudgetData(prev => ({
                  ...prev,
                  discountPct: Number(value),
                }))
              }
            />
            <Text>%</Text>
          </View>

          <Text style={styles.discountPrice}>
            {formatCurrency(
              (budget?.items?.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
              ) || 0) *
                ((budget?.discountPct || 0) / 100)
            )}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Valor total</Text>

          <View style={styles.totalPrices}>
            {!!budget?.discountPct && (
              <Text style={styles.originalPrice}>
                {formatCurrency(totalPrice)}
              </Text>
            )}
            <Text style={styles.finalPrice}>
              <Text style={styles.currency}>R$</Text> {finalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  itemsCount: {
    fontSize: 12,
    color: '#676767',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  currency: {
    fontSize: 14,
    fontWeight: '400',
  },
  discountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discountInput: {
    width: 35,
  },
  discountPrice: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  totalLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  totalPrices: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '700',
  },
});
