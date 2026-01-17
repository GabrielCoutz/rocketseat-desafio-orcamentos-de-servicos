import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusFilters } from '@/components/StatusFilters';
import { OrderingFilters } from '@/components/OrderingFilters';

export default function Filter() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Filtrar e ordenar</Text>

        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.8}
          style={styles.closeButton}
        >
          <MaterialIcons name='close' size={24} color='#4A4A4A' />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <StatusFilters />
      </View>

      <View style={styles.filtersContainer}>
        <OrderingFilters />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  filtersContainer: {
    padding: 20,
  },
});
