import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusFilters } from '@/components/StatusFilters';
import { OrderingFilters } from '@/components/OrderingFilters';
import { RootStackParamList } from '@/types/navigation';
import { Button } from '@/components/Button';

export default function Filter() {
  const { navigate, setParams } = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'filter'>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Filtrar e ordenar</Text>

        <TouchableOpacity
          onPress={() =>
            navigate('home', params, {
              merge: true,
              pop: true,
            })
          }
          activeOpacity={0.8}
          style={styles.closeButton}
        >
          <MaterialIcons name='close' size={24} color='#4A4A4A' />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.filtersContainer}>
          <StatusFilters />
        </View>

        <View style={styles.filtersContainer}>
          <OrderingFilters />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          style={{
            backgroundColor: '#FAFAFA',
            borderWidth: 1,
            borderColor: '#E6E5E5',
            padding: 12,
            borderRadius: 999,
          }}
          onPress={() => {
            setParams({
              status: undefined,
              orderBy: undefined,
              search: undefined,
              id: undefined,
            });
            navigate(
              'home',
              {
                status: undefined,
                orderBy: undefined,
                search: undefined,
              },
              {
                merge: true,
                pop: true,
              }
            );
          }}
        >
          <Text style={{ color: '#6A46EB' }}>Resetar filtros</Text>
        </Button>

        <Button
          onPress={() =>
            navigate('home', params, {
              merge: true,
              pop: true,
            })
          }
          activeOpacity={0.8}
        >
          <MaterialIcons name='check' size={24} color='white' />

          <Text style={{ color: 'white' }}>Aplicar</Text>
        </Button>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
  },
});
