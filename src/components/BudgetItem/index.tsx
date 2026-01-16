import { StatusTag } from '@/components/StatusTag';
import { StyleSheet, Text, View } from 'react-native';

export const BudgetItem = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexShrink: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title} numberOfLines={2}>
          Desenvolvimento de aplicativo de loja online
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          Soluções Tecnológicas Beta
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
        <StatusTag status='pending' />

        <Text style={styles.price}>
          <Text style={styles.currency}>R$</Text> 5.000,00
        </Text>
      </View>
    </View>
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
