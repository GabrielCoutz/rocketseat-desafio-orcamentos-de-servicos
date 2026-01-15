import { Button } from '@/components/Button';
import { StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View style={homeStyles.texts}>
          <Text style={homeStyles.headerTitle}>Orçamentos</Text>
          <Text style={homeStyles.headerSubtitle}>
            Você tem 1 item em rascunho
          </Text>
        </View>

        <Button>
          <MaterialIcons name='add' size={24} color='#FFFFFF' />

          <Text style={homeStyles.buttonText}>Novo</Text>
        </Button>
      </View>
    </View>
  );
}

const homeStyles = StyleSheet.create({
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
