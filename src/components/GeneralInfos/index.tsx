import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';

export const GeneralInfos = ({
  budget,
  handleChangeBudgetData,
}: IChangeBudgetPropsHandlers) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name='storefront' size={16} color='#6A46EB' />

        <Text style={styles.headerText}>Informações Gerais</Text>
      </View>

      <View style={styles.content}>
        <Input
          placeholder='Título'
          value={budget?.title}
          onChangeText={text =>
            handleChangeBudgetData(prev =>
              prev ? { ...prev, title: text } : prev
            )
          }
        />
        <Input
          placeholder='Cliente'
          value={budget?.client}
          onChangeText={text =>
            handleChangeBudgetData(prev =>
              prev ? { ...prev, client: text } : prev
            )
          }
        />
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
});
